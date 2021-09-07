// 웹팩 옵션 설정 파일

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode: mode,
  /** 웹팩 출발 지점 */
  entry: "./src/index.js",
  /** 웹팩 결과물 내보낼 지점 */
  output: {
    filename: "[name].js", // 결과물 저장 네이밍
    // path: path.resolve(__dirname, "./dist"), // __dirname(경로)/build/bundle.js 로 저장
    path: path.resolve("./dist"), // __dirname(경로)/build/bundle.js 로 저장
    clean: true // 해당 디렉토리안에 쓰이지 않는 파일 정리
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // style-loader: 자바스크립트로 변경된 스타일을 동적으로 돔에 추가
        // css-loader: CSS 파일을 자바스크립트에서 불러와 사용하려면 CSS를 모듈로 변환
        use: [
          mode === "production"
            ? MiniCssExtractPlugin.loader // 프로덕션 환경
            : "style-loader", // 개발 환경
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 다음 확장자로 마치는 모든 파일
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    ...(mode === "production"
      ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
      : [])
  ],
  devServer: {
    //   // 404일 때 index.html로 리다이렉트 해주는 기능
    historyApiFallback: true,
    hot: true
  },
  devtool: "source-map"
};
