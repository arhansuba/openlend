// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/interfaces/IPriceOracle.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@aave/core-v3/contracts/libraries/types/DataTypes.sol";

contract EfficiencyModeManager is Ownable {
    IPool public pool;
    IPriceOracle public priceOracle;

    // Event to notify when efficiency mode is activated
    event EfficiencyModeActivated(address indexed user);
    event EfficiencyModeDeactivated(address indexed user);
    event CollateralFactorUpdated(address indexed asset, uint256 newFactor);

    mapping(address => bool) public isEfficiencyModeActive; // Keeps track of users who have efficiency mode active
    mapping(address => uint256) public efficiencyCollateralFactor; // Custom collateral factor during efficiency mode

    constructor(address _pool, address _priceOracle) {
        pool = IPool(_pool);
        priceOracle = IPriceOracle(_priceOracle);
    }

    /**
     * @dev Activates efficiency mode for a user, increasing their collateral factor for specific assets
     * @param assets The list of assets for which efficiency mode is applied
     * @param newCollateralFactors The new collateral factors during efficiency mode for each asset
     */
    function activateEfficiencyMode(address[] memory assets, uint256[] memory newCollateralFactors) external {
        require(!isEfficiencyModeActive[msg.sender], "Efficiency mode already active");
        require(assets.length == newCollateralFactors.length, "Mismatched arrays");

        for (uint256 i = 0; i < assets.length; i++) {
            efficiencyCollateralFactor[assets[i]] = newCollateralFactors[i];
            emit CollateralFactorUpdated(assets[i], newCollateralFactors[i]);
        }

        isEfficiencyModeActive[msg.sender] = true;
        emit EfficiencyModeActivated(msg.sender);
    }

    /**
     * @dev Deactivates efficiency mode for a user, reverting collateral factors to default values
     * @param assets The list of assets for which efficiency mode was applied
     */
    function deactivateEfficiencyMode(address[] memory assets) external {
        require(isEfficiencyModeActive[msg.sender], "Efficiency mode is not active");

        for (uint256 i = 0; i < assets.length; i++) {
            delete efficiencyCollateralFactor[assets[i]];
        }

        isEfficiencyModeActive[msg.sender] = false;
        emit EfficiencyModeDeactivated(msg.sender);
    }

    /**
     * @dev Calculates the user's total available collateral in efficiency mode based on the increased collateral factors
     * @param user The address of the user
     * @return totalCollateral The total value of the user's collateral in efficiency mode
     */
    function calculateEfficiencyModeCollateral(address user) public view returns (uint256 totalCollateral) {
        DataTypes.UserAccountData memory userData = pool.getUserAccountData(user);
        address[] memory collateralAssets = pool.getReservesList();
        totalCollateral = 0;

        for (uint256 i = 0; i < collateralAssets.length; i++) {
            address asset = collateralAssets[i];
            uint256 userBalance = pool.getUserReserveData(asset, user).currentATokenBalance;
            uint256 price = priceOracle.getAssetPrice(asset);
            uint256 collateralValue = userBalance * price;

            if (isEfficiencyModeActive[user] && efficiencyCollateralFactor[asset] > 0) {
                collateralValue = (collateralValue * efficiencyCollateralFactor[asset]) / 1e4;
            }

            totalCollateral += collateralValue;
        }
    }

    /**
     * @dev Allows the owner to set the default collateral factors for assets (for future expansions)
     * @param assets The list of assets
     * @param factors The list of collateral factors (in basis points, e.g., 75% is 7500)
     */
    function setCollateralFactors(address[] memory assets, uint256[] memory factors) external onlyOwner {
        require(assets.length == factors.length, "Mismatched arrays");

        for (uint256 i = 0; i < assets.length; i++) {
            efficiencyCollateralFactor[assets[i]] = factors[i];
            emit CollateralFactorUpdated(assets[i], factors[i]);
        }
    }
}
