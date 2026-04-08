import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class ModelViewerComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(modelPath) {
        // Создаем контейнер для 3D сцены
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '300px';
        container.style.borderRadius = '15px';
        container.style.overflow = 'hidden';
        container.style.backgroundColor = '#e5e5ea'; // Светло-серый фон Apple

        this.parent.appendChild(container);

        // Инициализация Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
        camera.position.set(0, 2, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Свет
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 2);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        // Контроллер (вращение мышью)
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Загрузка GLB модели
        const loader = new GLTFLoader();
        loader.load(
            modelPath, // Путь к модели (например 'models/smart-home.glb')
            (gltf) => {
                const model = gltf.scene;

                // Центрирование модели
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center); // Центрируем по осям

                scene.add(model);
            },
            undefined,
            (error) => {
                console.error('Ошибка загрузки модели:', error);
                container.innerHTML = '<p class="text-center mt-5 text-muted">Модель не найдена. Положите .glb файл в папку models/</p>';
            }
        );

        // Анимационный цикл
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    }
}
