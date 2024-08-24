// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/interfaces/IPoolDataProvider.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CustomInterestRateModel is Ownable {
    using SafeMath for uint256;

    IPoolDataProvider public poolDataProvider;

    // Interest rate parameters
    uint256 public baseRate; // Base interest rate (annualized)
    uint256 public volatilityMultiplier; // Multiplier to adjust the rate based on volatility
    uint256 public poolUtilizationMultiplier; // Multiplier to adjust the rate based on pool utilization

    // Event to log parameter updates
    event ParametersUpdated(uint256 baseRate, uint256 volatilityMultiplier, uint256 poolUtilizationMultiplier);

    constructor(address _poolDataProvider) {
        poolDataProvider = IPoolDataProvider(_poolDataProvider);
    }

    /**
     * @dev Sets the interest rate parameters
     * @param _baseRate The base interest rate (annualized)
     * @param _volatilityMultiplier The multiplier to adjust the rate based on asset volatility
     * @param _poolUtilizationMultiplier The multiplier to adjust the rate based on pool utilization
     */
    function setParameters(uint256 _baseRate, uint256 _volatilityMultiplier, uint256 _poolUtilizationMultiplier) external onlyOwner {
        baseRate = _baseRate;
        volatilityMultiplier = _volatilityMultiplier;
        poolUtilizationMultiplier = _poolUtilizationMultiplier;
        
        emit ParametersUpdated(baseRate, volatilityMultiplier, poolUtilizationMultiplier);
    }

    /**
     * @dev Calculates the interest rate based on asset volatility and pool conditions
     * @param asset The address of the asset
     * @return interestRate The calculated interest rate
     */
    function calculateInterestRate(address asset) public view returns (uint256 interestRate) {
        (uint256 utilizationRate, uint256 volatility) = getAssetMetrics(asset);

        // Base rate adjusted by asset volatility
        uint256 volatilityAdjustment = volatility.mul(volatilityMultiplier).div(1e18);
        uint256 adjustedBaseRate = baseRate.add(volatilityAdjustment);

        // Utilization rate adjustment
        uint256 utilizationAdjustment = utilizationRate.mul(poolUtilizationMultiplier).div(1e18);
        interestRate = adjustedBaseRate.add(utilizationAdjustment);
    }

    /**
     * @dev Fetches asset metrics such as utilization rate and volatility
     * @param asset The address of the asset
     * @return utilizationRate The utilization rate of the asset
     * @return volatility The volatility of the asset
     */
    function getAssetMetrics(address asset) internal view returns (uint256 utilizationRate, uint256 volatility) {
        // Fetch asset data from pool data provider
        (utilizationRate, volatility) = poolDataProvider.getAssetMetrics(asset);

        // Example of utilizationRate and volatility being returned as percentage values with 18 decimals precision
        // For actual implementation, adjust according to the data provider's output format
    }
}
