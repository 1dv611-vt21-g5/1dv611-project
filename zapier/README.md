# Zapier Integration for Ysocial

This is the CLI version of our Zapier integration with Yggio. It was originally built in the Web UI but has been exported here for inclusion in the git repo.

Contents of this folder: 
```
README.md - This file
sourceDefinition.json - A JSON representation of the Integration, not usable for deployment.
/src - The source code of the integration, Javascript
```

To develop/upload the integration, you will require Node, npm and the Zapier CLI:

```bash
# install the CLI globally
npm install -g zapier-platform-cli
```
You must also configure a `.env`-file in the root of `/src`:
```
BACKEND_URL=The URI for your hosted Ysocial backend
```
Then:

  1. Run `zapier login` and follow the instructions to log in to your Zapier account. There are options for both user/pw and SSO accounts.
  2. `cd src && npm install`
  3. Make potential changes to the source code, see: https://platform.zapier.com/cli_docs/docs for documentation.
  4. `zapier push` to upload changes to Zapier.

NOTE: Once an application has been pushed via CLI to Zapier it is converted from a "Web UI Integration" to a "CLI Integration" permanently. All future changes must be made in the source code. If this is not what you want skip the above steps and edit the integration via the Web UI: https://developer.zapier.com/app/131910/version/1.0.0
We will add Sensative/Yggio team members to the integration team @ Zapier and hand over ownership in connection with our handover.
