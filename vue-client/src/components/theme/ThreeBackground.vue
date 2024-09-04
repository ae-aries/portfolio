<template>
    <div ref="container"></div>
  </template>
  
  <script>
  import * as THREE from 'three';
  
  export default {
    name: 'ThreeBackground',
    mounted() {
      this.initThree();
    },
    methods: {
      initThree() {
        const container = this.$refs.container;
        
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        
        // Camera position - moved closer to the grid
        camera.position.set(0, 2, 2);
        camera.lookAt(0, 0, 0);
        
        // Add central light
        const light = new THREE.PointLight(0xffffff, 1.5, 10);
        light.position.set(0, 1, 0);
        scene.add(light);
        
        // Grid creation
        const gridSize = 10;
        const gridStep = 0.25;
        const gridGeometry = new THREE.BufferGeometry();
        const gridMaterial = new THREE.LineBasicMaterial({ 
          vertexColors: true,
          fog: true
        });
        
        const gridVertices = [];
        const gridColors = [];
        for (let i = -gridSize; i <= gridSize; i += gridStep) {
          gridVertices.push(-gridSize, 0, i, gridSize, 0, i);
          gridVertices.push(i, 0, -gridSize, i, 0, gridSize);
          
          const color1 = new THREE.Color(0x888888);
          const color2 = new THREE.Color(0x888888);
          
          // Adjust color based on distance from center
          const distanceFromCenter = Math.abs(i) / gridSize;
          const fadeStart = 0.25; // Start fading at 1/4 of the distance from center
          const fadeEnd = 0.5; // Complete fade at 1/2 of the distance from center
          let opacity = 1;
          
          if (distanceFromCenter > fadeStart) {
            opacity = 1 - (distanceFromCenter - fadeStart) / (fadeEnd - fadeStart);
            opacity = Math.max(0, Math.min(1, opacity));
          }
          
          color1.lerp(new THREE.Color(0x000000), 1 - opacity);
          color2.lerp(new THREE.Color(0x000000), 1 - opacity);
          
          gridColors.push(color1.r, color1.g, color1.b);
          gridColors.push(color2.r, color2.g, color2.b);
          gridColors.push(color1.r, color1.g, color1.b);
          gridColors.push(color2.r, color2.g, color2.b);
        }
        
        gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(gridVertices, 3));
        gridGeometry.setAttribute('color', new THREE.Float32BufferAttribute(gridColors, 3));
        const gridLines = new THREE.LineSegments(gridGeometry, gridMaterial);
        scene.add(gridLines);
        
        // Add small cubes
        const cubes = [];
        const cubeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
        
        for (let i = 0; i < 30; i++) {
          const cube = new THREE.Mesh(cubeGeometry, cubeMaterial.clone());
          cube.position.set(
            (Math.random() - 0.5) * gridSize,
            0.05,
            (Math.random() - 0.5) * gridSize
          );
          scene.add(cube);
          cubes.push(cube);
        }
        
        // Add fog
        scene.fog = new THREE.Fog(0x000000, 1, 8);
        
        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          
          gridLines.rotation.y += 0.002;
          cubes.forEach(cube => {
            cube.rotation.y += 0.01;
          });
          
          renderer.render(scene, camera);
        };
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Handle hover effect
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        container.addEventListener('mousemove', (event) => {
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
          
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(cubes);
          
          cubes.forEach(cube => {
            cube.material.opacity = 0.5;
          });
          
          intersects.forEach(intersect => {
            intersect.object.material.opacity = 1;
          });
        });
      }
    }
  }
  </script>
  
  <style scoped>
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: #000000;
  }
  </style>