document.addEventListener('DOMContentLoaded', () => {
	const buttonfirst = document.body.getElementsByClassName('buttonfirst')[0]
	const buttonsecond = document.body.getElementsByClassName('buttonsecond')[0]
	const buttonthird = document.body.getElementsByClassName('buttonthird')[0]
	const buttonfourth = document.body.getElementsByClassName('buttonfourth')[0]
	const heart1 = document.body.getElementsByClassName('heart1')[0]
	const list1 = document.body.getElementsByClassName('list1')[0]
	const list2 = document.body.getElementsByClassName('list2')[0]
	const list3 = document.body.getElementsByClassName('list3')[0]
	const list4 = document.body.getElementsByClassName('list4')[0]
	const list5 = document.body.getElementsByClassName('list5')[0]
	let option = 0
	const paragraph = document.createElement('p')

	const scene = new THREE.Scene()
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	)
	const renderer = new THREE.WebGLRenderer({ antialias: true })
	let model

	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setClearColor(0xcccccc)
	document.getElementById('3d-container').appendChild(renderer.domElement)

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
	scene.add(ambientLight)
	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
	directionalLight.position.set(0, 10, 5)
	scene.add(directionalLight)

	const loader = new THREE.GLTFLoader()
	loader.load('./models/romashka.glb', gltf => {
		model = gltf.scene

		model.scale.set(0.05, 0.05, 0.05)

		const box = new THREE.Box3().setFromObject(model)
		const center = box.getCenter(new THREE.Vector3())
		model.position.sub(center)

		scene.add(model)

		camera.position.set(0, 0, 2)
		camera.lookAt(scene.position)

		console.log('Модель загружена')
	})

	function animate() {
		requestAnimationFrame(animate)

		if (model) {
			model.rotation.y += 0.005
		}

		renderer.render(scene, camera)
	}
	animate()

	window.addEventListener('resize', onWindowResize, false)
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight)
	}

	buttonfirst.addEventListener('click', () => {
		list1.classList.add('hidden')
		list2.classList.remove('hidden')
	})
	buttonsecond.addEventListener('click', () => {
		list2.classList.add('hidden')
		list3.classList.remove('hidden')
		option = 'flower2'
	})
	buttonthird.addEventListener('click', () => {
		list3.classList.add('hidden')
		list4.classList.remove('hidden')
	})
	buttonfourth.addEventListener('click', () => {
		list4.classList.add('hidden')
		list5.classList.remove('hidden')
		paragraph.innerText = `${option}`
		list5.appendChild(paragraph)
	})
	heart1.addEventListener('click', () => {
		if (option) {
			list5.classList.remove('hidden')
			list1.classList.add('hidden')
			list2.classList.add('hidden')
			list3.classList.add('hidden')
			list4.classList.add('hidden')
		}
	})
})
