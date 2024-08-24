// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/interfaces/IPoolConfigurator.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CustomReserveManager is Ownable {
    using SafeMath for uint256;

    IPool public pool;
    IPoolConfigurator public poolConfigurator;

    // Struct to hold custom reserve parameters
    struct ReserveParams {
        uint256 liquidationThreshold;
        uint256 liquidationBonus;
        uint256 reserveFactor;
        uint256 borrowCap;
        uint256 supplyCap;
    }

    // Mapping to store parameters for each reserve
    mapping(address => ReserveParams) public reserveParams;

    // Events
    event ReserveParamsUpdated(address indexed asset, uint256 liquidationThreshold, uint256 liquidationBonus, uint256 reserveFactor, uint256 borrowCap, uint256 supplyCap);

    constructor(address _pool, address _poolConfigurator) {
        pool = IPool(_pool);
        poolConfigurator = IPoolConfigurator(_poolConfigurator);
    }

    /**
     * @dev Updates reserve parameters for a given asset.
     * @param asset The address of the asset
     * @param liquidationThreshold The new liquidation threshold
     * @param liquidationBonus The new liquidation bonus
     * @param reserveFactor The new reserve factor
     * @param borrowCap The new borrow cap
     * @param supplyCap The new supply cap
     */
    function updateReserveParams(
        address asset,
        uint256 liquidationThreshold,
        uint256 liquidationBonus,
        uint256 reserveFactor,
        uint256 borrowCap,
        uint256 supplyCap
    ) external onlyOwner {
        // Validate input parameters
        require(asset != address(0), "Invalid asset address");
        require(liquidationThreshold <= 1e18, "Invalid liquidation threshold");
        require(liquidationBonus <= 1e18, "Invalid liquidation bonus");
        require(reserveFactor <= 1e18, "Invalid reserve factor");

        // Update parameters in storage
        reserveParams[asset] = ReserveParams({
            liquidationThreshold: liquidationThreshold,
            liquidationBonus: liquidationBonus,
            reserveFactor: reserveFactor,
            borrowCap: borrowCap,
            supplyCap: supplyCap
        });

        // Update reserve parameters in the pool configurator
        poolConfigurator.setReserveParams(
            asset,
            liquidationThreshold,
            liquidationBonus,
            reserveFactor
        );

        // Set borrow and supply caps
        poolConfigurator.setReserveCaps(
            asset,
            borrowCap,
            supplyCap
        );

        emit ReserveParamsUpdated(asset, liquidationThreshold, liquidationBonus, reserveFactor, borrowCap, supplyCap);
    }

    /**
     * @dev Returns the current parameters for a given reserve.
     * @param asset The address of the asset
     * @return The reserve parameters
     */
    function getReserveParams(address asset) external view returns (ReserveParams memory) {
        return reserveParams[asset];
    }

    /**
     * @dev Adds a new reserve to the pool with custom parameters.
     * @param asset The address of the asset
     * @param liquidationThreshold The liquidation threshold
     * @param liquidationBonus The liquidation bonus
     * @param reserveFactor The reserve factor
     * @param borrowCap The borrow cap
     * @param supplyCap The supply cap
     */
    function addNewReserve(
        address asset,
        uint256 liquidationThreshold,
        uint256 liquidationBonus,
        uint256 reserveFactor,
        uint256 borrowCap,
        uint256 supplyCap
    ) external onlyOwner {
        // Add reserve to the pool
        poolConfigurator.addReserve(asset);

        // Set reserve parameters
        updateReserveParams(
            asset,
            liquidationThreshold,
            liquidationBonus,
            reserveFactor,
            borrowCap,
            supplyCap
        );
    }
}
