// Contract deployed address Polygon :- 0xd60FCd0E882c41d0d9c5b2D4AaC17c517BE8f60C

import Movements from "./movement.js";
import polygon from "./web3.js";
// import polygon from "./Web3.js";
import abi from "./abi/abi.json" assert { type: "json" };

polygon.then((result) => {
  result.nft.forEach((object, index) => {
    if (index <= result.supply) {
      const geometry_cone = new THREE.ConeGeometry(
        object.w,
        object.h,
        object.d
      );
      const material_cone = new THREE.MeshPhongMaterial({ color: 0x1be3ef });
      const NFT = new THREE.Mesh(geometry_cone, material_cone);
      NFT.position.set(object.x, object.y, object.z);
      scene.add(NFT);
    }
  });
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const ambient_light = new THREE.AmbientLight(0x404040);
const direction_light = new THREE.DirectionalLight(0xffffff, 1);
ambient_light.add(direction_light);
scene.add(ambient_light);

const geometry_area = new THREE.BoxGeometry(100, 0.2, 50);
const material_area = new THREE.MeshPhongMaterial({ color: 0xffffff });
const area = new THREE.Mesh(geometry_area, material_area);
scene.add(area);

camera.position.z = 5;
camera.position.set(10, 5, 40);

function animate() {
  requestAnimationFrame(animate);

  if (Movements.isPressed(37)) {
    //left
    camera.position.x -= 0.5;
  }
  if (Movements.isPressed(38)) {
    //up
    camera.position.x += 0.5;
    camera.position.y += 0.5;
  }
  if (Movements.isPressed(39)) {
    //right
    camera.position.x += 0.5;
  }
  if (Movements.isPressed(40)) {
    //down
    camera.position.x -= 0.5;
    camera.position.y -= 0.5;
  }

  camera.lookAt(area.position);
  renderer.render(scene, camera);
}
animate();
renderer.render(scene, camera);

const button = document.querySelector("#mint");
button.addEventListener("click", mintNFT);

// async function mintNFT() {
//   let nft_name = document.querySelector("#nft_name").value;
//   let nft_width = document.querySelector("#nft_width").value;
//   let nft_height = document.querySelector("#nft_height").value;
//   let nft_depth = document.querySelector("#nft_depth").value;
//   let nft_x = document.querySelector("#nft_x").value;
//   let nft_y = document.querySelector("#nft_y").value;
//   let nft_z = document.querySelector("#nft_z").value;

//   if (typeof window.ethereum == "undefined") {
//     rej("You should install Metamask");
//   }

//   let web3 = new Web3(window.ethereum);
//   let contract = new web3.eth.Contract(
//     abi,
//     "0xd60FCd0E882c41d0d9c5b2D4AaC17c517BE8f60C"
//   );

//   web3.eth.requestAccounts().then((accounts) => {
//     contract.methods
//       .mint(nft_name, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z)
//       .send({
//         from: accounts[0],
//         value: "10",
//       })
//       .then((data) => {
//         console.log("NFT is minted");
//       });
//   });
// }

// polygon.then((result) => {
//   result.nft.forEach((object, index) => {
//     if (index <= result.supply) {
//       const geometry_cube = new THREE.BoxGeometry(object.w, object.h, object.d);
//       const material_cube = new THREE.MeshPhongMaterial({ color: 0x1be3ef });
//       const nft = new THREE.Mesh(geometry_cube, material_cube);
//       nft.position.set(object.x, object.y, object.z);
//       scene.add(nft);
//     }
//   });
// });


async function mintNFT() {
  let nft_name = document.querySelector("#nft_name").value;
  let nft_width = document.querySelector("#nft_width").value;
  let nft_height = document.querySelector("#nft_height").value;
  let nft_depth = document.querySelector("#nft_depth").value;
  let nft_x = document.querySelector("#nft_x").value;
  let nft_y = document.querySelector("#nft_y").value;
  let nft_z = document.querySelector("#nft_z").value;

  if (typeof window.ethereum == "undefined") {
    rej("You should install Metamask");
  }

  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(
    abi,
    "0x9647D18bFd52F007F382804910A887c580E4f083"
  );

  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .mint(nft_name, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z)
      .send({
        from: accounts[0],
        value: "10",
      })
      .then((data) => {
        console.log("NFT is minted");
      });
  });
}

polygon.then((result) => {
  result.nft.forEach((object, index) => {
    if (index <= result.supply) {
      const geometry_cube = new THREE.BoxGeometry(object.w, object.h, object.d);
      const material_cube = new THREE.MeshPhongMaterial({ color: 0x1be3ef });
      const nft = new THREE.Mesh(geometry_cube, material_cube);

      nft.position.set(object.x, object.y, object.z);
      scene.add(nft);
    }
  });
});