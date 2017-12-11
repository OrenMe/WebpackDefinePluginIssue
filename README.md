# WebpackDefinePluginIssue
Demonstrate an issue when using DefinePlugin and Babel preset-env modules set to false

```
git clone
yarn install
yarn run build
```

There are two targets - `working` and `notworking`

Once transpiled it can be seen that in the `working` target the DefinePlugin tokens are replaced and exported,
and in the `notworking` target the tokens remain unreplaced.
