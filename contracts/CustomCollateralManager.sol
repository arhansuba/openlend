// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/protocol/CollateralManager.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/interfaces/IERC20.sol";
import "@aave/core-v3/contracts/libraries/types/DataTypes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomCollateralManager is CollateralManager, Ownable {
    // Mapping to store custom collateral factors for assets
    mapping(address => uint256) public customCollateralFactors;
    
    // Event for logging collateral factor changes
    event CollateralFactorUpdated(address indexed asset, uint256 newFactor);
    
    // Pool contract for lending/borrowing actions
    IPool public pool;

    // Allow multi-asset collateral with weighted collateral factors
    struct MultiAssetCollateral {
        address[] assets;
        uint256[] amounts; // Amounts corresponding to each asset
    }

    mapping(address => MultiAssetCollateral) public userCollateral;

    constructor(IPoolAddressesProvider provider) CollateralManager(provider) {
        pool = IPool(provider.getPool());
    }

    /**
     * @notice Set a custom collateral factor for an asset.
     * @param asset The address of the asset.
     * @param factor The collateral factor to be set (in percentage points, 50 = 50%).
     */
    function setCustomCollateralFactor(address asset, uint256 factor) external onlyOwner {
        require(factor <= 100, "Collateral factor cannot exceed 100%");
        customCollateralFactors[asset] = factor;
        emit CollateralFactorUpdated(asset, factor);
    }

    /**
     * @notice Allows users to deposit multiple assets as collateral in one transaction.
     * @param assets The list of asset addresses.
     * @param amounts The list of amounts corresponding to each asset.
     */
    function depositMultiAssetCollateral(address[] calldata assets, uint256[] calldata amounts) external {
        require(assets.length == amounts.length, "Mismatched asset and amount arrays");
        
        for (uint256 i = 0; i < assets.length; i++) {
            address asset = assets[i];
            uint256 amount = amounts[i];
            
            require(amount > 0, "Invalid collateral amount");
            
            // Transfer the collateral to the pool (simplified, pool implementation handles this)
            IERC20(asset).transferFrom(msg.sender, address(pool), amount);
        }

        userCollateral[msg.sender] = MultiAssetCollateral(assets, amounts);
    }

    /**
     * @notice Returns the total value of a user's collateral in ETH, based on custom collateral factors.
     * @param user The address of the user.
     * @return totalCollateralValue The total collateral value in ETH.
     */
    function getUserTotalCollateralValue(address user) external view returns (uint256 totalCollateralValue) {
        MultiAssetCollateral storage collateral = userCollateral[user];

        for (uint256 i = 0; i < collateral.assets.length; i++) {
            address asset = collateral.assets[i];
            uint256 amount = collateral.amounts[i];

            // Get the price of the asset in ETH from the Aave Oracle
            uint256 priceInETH = _getAssetPriceInETH(asset);
            
            // Get the collateral factor for the asset
            uint256 collateralFactor = customCollateralFactors[asset] > 0 
                ? customCollateralFactors[asset]
                : _getDefaultCollateralFactor(asset);
                
            // Calculate the total collateral value in ETH, applying the collateral factor
            totalCollateralValue += (amount * priceInETH * collateralFactor) / 100;
        }
    }

    /**
     * @notice Gets the price of an asset in ETH using the Aave Oracle.
     * @param asset The address of the asset.
     * @return priceInETH The price of the asset in ETH.
     */
    function _getAssetPriceInETH(address asset) internal view returns (uint256 priceInETH) {
        IPoolAddressesProvider provider = pool.ADDRESSES_PROVIDER();
        address oracle = provider.getPriceOracle();
        priceInETH = IPriceOracleGetter(oracle).getAssetPrice(asset);
    }

    /**
     * @notice Retrieves the default collateral factor from the Aave protocol for an asset.
     * @param asset The address of the asset.
     * @return factor The default collateral factor.
     */
    function _getDefaultCollateralFactor(address asset) internal view returns (uint256 factor) {
        DataTypes.ReserveConfigurationMap memory configuration = pool.getConfiguration(asset);
        (, factor, , , ) = configuration.getParams();
    }

    /**
     * @notice Withdraw multi-asset collateral for the user.
     * @param assets The array of asset addresses to withdraw.
     * @param amounts The array of amounts to withdraw for each asset.
     */
    function withdrawMultiAssetCollateral(address[] calldata assets, uint256[] calldata amounts) external {
        require(assets.length == amounts.length, "Mismatched asset and amount arrays");
        
        MultiAssetCollateral storage collateral = userCollateral[msg.sender];

        for (uint256 i = 0; i < assets.length; i++) {
            address asset = assets[i];
            uint256 amount = amounts[i];
            
            require(amount > 0, "Invalid withdrawal amount");
            require(collateral.amounts[i] >= amount, "Insufficient collateral");

            // Update user's collateral record
            collateral.amounts[i] -= amount;

            // Withdraw the collateral from the pool (simplified for illustration)
            IERC20(asset).transfer(msg.sender, amount);
        }
    }
}
