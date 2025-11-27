```markdown
# Deploy & Verify (instructions)

This file explains how to deploy and verify the PolarisToken in a Codespace or locally and via the GitHub Actions workflow.

1) Add repository secrets (do not commit private keys):
   - MAINNET_RPC (e.g. Infura/Alchemy URL)
   - BSC_RPC (if you plan to deploy to BSC)
   - DEPLOYER_KEY (0x-prefixed private key of deployer account)
   - ETHERSCAN_API_KEY (Etherscan API key)
   - BSCSCAN_API_KEY (BscScan API key, if used)

Example using `gh` CLI to set secrets (run locally, not in Codespace):
  echo "YOUR_MAINNET_RPC" | gh secret set MAINNET_RPC --repo koko-app/okx
  echo "YOUR_BSC_RPC" | gh secret set BSC_RPC --repo koko-app/okx
  echo "0xyourprivatekey" | gh secret set DEPLOYER_KEY --repo koko-app/okx
  echo "T7MITVEJ2QWNMU2ZHTB44HFHMR2IKZW1WE" | gh secret set ETHERSCAN_API_KEY --repo koko-app/okx
  # Set BSCSCAN_API_KEY if needed:
  # echo "YOUR_BSCSCAN_API_KEY" | gh secret set BSCSCAN_API_KEY --repo koko-app/okx

2) From a Codespace or local environment:

- To run a local hardhat node:
  npx hardhat node

- To deploy to local node:
  INITIAL_SUPPLY=1000000 npx hardhat run scripts/deploy.js --network localhost

- To deploy & verify on mainnet (locally):
  export MAINNET_RPC="https://..."
  export DEPLOYER_KEY="0x..."
  export ETHERSCAN_API_KEY="T7... (SECRET)"
  INITIAL_SUPPLY=1000000 npx hardhat run scripts/deploy.js --network mainnet
  # Copy deployed address from output and run:
  npx hardhat verify --network mainnet <DEPLOYED_ADDRESS> 1000000

3) To run the GitHub Actions workflow to deploy & verify:
- In GitHub UI: go to Actions -> Deploy and Verify -> Run workflow
- Or use gh CLI:
  gh workflow run "Deploy and Verify (manual)" --repo koko-app/okx -f network=mainnet -f initial_supply=1000000

Important security note:
- Do NOT commit private keys anywhere. Store them only in GitHub Secrets or a secure vault.
- The example above uses the Etherscan API key: keep it as a repo secret (I showed how to set it with gh CLI).
```