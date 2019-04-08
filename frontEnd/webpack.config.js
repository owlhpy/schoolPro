// export default function(webpackConfig) {
//   delete webpackConfig.resolve.alias['@babel/runtime'];
//   return webpackConfig;
// }
export default function(webpackConfig) {
delete webpackConfig.resolve.modules
return webpackConfig;
}