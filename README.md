﻿GLSL によるフィルタのサンプル
========================

## 概要

* OpenGL / GLSL のテクスチャマッピング機能を使った単純な画像フィルタの実装サンプルです。
* カメラからの映像入力には OpenCV を使っていますが、OpenCV の画像処理機能自体は使っていません。
* Windows (Visual Studio 2013) / Mac OS X (Xcode 5) / Linux (Makefile) に対応しています。

## 実行環境

* USB カメラなどのビデオ入力
* OpenGL 3.2 以降に対応したビデオカード
* GLFW 3.0.x (Windows 版と Mac 版は同梱)
* OpenCV 2.4.x
* Visual Studio 2013 (Windows) または Xcode 5 (Mac)

## 操作方法

 PC にビデオカメラを接続してプログラムを実行してください。

### キー操作

* 0: カメラ入力そのまま
* 1: 3x3 画素の平均
* 2: 5x5 画素の平均
* 3: 7x7 画素の平均
* 4: 3x3 画素の最大値と最小値を除いた平均
* 5: 5x5 画素の最大値と最小値を除いた平均
* 6: 7x7 画素の最大値と最小値を除いた平均
* 7: 3x3 画素の中間値
* 8: 5x5 画素のガウシアンフィルタ
* 9: 5x5 画素のバイラテラルフィルタ
* ESC: プログラムの終了

## 備考

ビデオカードが OpenGL 3.2 に対応しても,
処理能力が不足していると 1 フレーム当たりの処理がタイムアウトしてしまい,
ドライバによってプログラムが強制終了させられてしまうことがあります.

main.cpp の先頭で定義している記号定数 BENCHMARK に 0 以外のものを設定すると,
1 フレームごとの処理時間を標準出力に出力するようになります.

以前はキャプチャと描画を別スレッドで実行していましたが,
OpenCV 2.4.x ではキャプチャの際にブロックしないようなので,
描画ループの中でキャプチャするようにしました.