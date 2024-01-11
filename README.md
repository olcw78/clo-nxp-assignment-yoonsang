# Solar System

### [프로젝트 실행 영상](https://youtu.be/c82oWQTQM_s)

---

## 사용 depenedencies

0. vite.js
1. typescript
2. lil-gui (debug GUI)
3. three
4. resetcss (css 초기화)
5. eslint

---

## 씬 이용

yarn dev - 프로젝트 실행
yarn build - 프로젝트를 ./dist 에 빌드

---

## 프로젝트 설명

1. 각 오브젝트들 회전 구현.

   - 태양: 자전 (12deg/s - 30 초 주기)
   - 지구: 자전 (360deg/s - 1초 주기), 공전(0.99/s - 365초 주기)
   - 달: 자전 (13.33deg/s - 27초 주기), 공전(13.33deg/s - 27초 주기)
     <br/>

3. 태양광을 표현하는 PointLight + emissive 이용하여 빛 표현.
4. 조작이 가능한 카메라 (Three.OrbitControls).
5. 다양한 수치를 조절할 수 있는 Controller UI (lil-gui 사용).
6. 더블 클릭 (최대화/복구), h 키로 debug GUI toggle.
7. 우주 배경의 Skybox (Three.CubeTexture).
8. Scene camera Unreal Bloom 적용.

---

## 프로젝트 진행

src/main.ts -> src/playground/index.ts -> Runner class -> 각 필요한 요소들을 빌더로 chaining.

---

## 프로젝트 구조

**_1개의 Scene Graph 를 중심으로 구현하여 씬 빌딩에 유연성을 추가_**
**_각 entity 별 lifecycle 구현하여 pluggable system 구현 (unity 구조)_**

주요소

1. CameraBuilder.
2. Runner 클래스를 SceneGraph 의 중심으로 Fluent Builder 로 구현.
3. 제작에 필요한 것을 모아 작업 가능한 Entity 구현.
4. Lifecycle System (IStartable, IUpdatable ..) 으로 각 필요한 생명주기 제공.
5. effect, modifier 구현.
