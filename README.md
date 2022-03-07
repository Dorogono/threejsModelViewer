# three.js Loader를 활용한 3D Model Viewer
## 상세 설명 보러 가기
https://www.notion.so/3D-Model-Viewer-e5d3825ea5eb4104b1cfc7578c3c1f18
## 모델 불러오기 (src/script.js)
```
const model = {
    name: 'Fox',
    type: 'gltf',
    path: 'Fox/glTF/Fox.gltf'
}
```
-> DB에 이런 형식으로 저장할 것이라고 가정하고 진행했다.
## 적용할 모듈 불러오기
```
import Experience from './Experience/Experience.js'
const canvas = document.getElementById('canvas4D')

new Experience(canvas, model)
```
-> 이렇게 3줄이면 화면에 내 모델이 나온다.
## 실행방법
1. npm install
2. npm run dev
3. localhost:2000 
