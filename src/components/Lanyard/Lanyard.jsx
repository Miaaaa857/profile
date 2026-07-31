/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import * as THREE from 'three'
import cardGLB from './card.glb'
import lanyardTexture from './lanyard.png'
import miaLogo from './mia-logo.png'
import contactQr from './contact-qr.jpg'
import './Lanyard.css'

extend({ MeshLineGeometry, MeshLineMaterial })

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 }
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 }

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, cardEmail = '' }) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.35 : 1.75]}
        gl={{ alpha: true, antialias: !isMobile }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} cardEmail={cardEmail} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}

function Band({ isMobile, cardEmail }) {
  const band = useRef()
  const fixed = useRef()
  const j1 = useRef()
  const j2 = useRef()
  const j3 = useRef()
  const card = useRef()
  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const { nodes, materials } = useGLTF(cardGLB)
  const texture = useTexture(lanyardTexture)
  const logoTexture = useTexture(miaLogo)
  const qrTexture = useTexture(contactQr)
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map
    const baseImage = baseMap.image
    const canvas = document.createElement('canvas')
    canvas.width = baseImage.width
    canvas.height = baseImage.height
    const context = canvas.getContext('2d')
    if (!context) return baseMap

    context.drawImage(baseImage, 0, 0, canvas.width, canvas.height)
    const { x: rectX, y: rectY, w: rectWidth, h: rectHeight } = FRONT_UV_RECT
    const x = rectX * canvas.width
    const y = rectY * canvas.height
    const width = rectWidth * canvas.width
    const height = rectHeight * canvas.height
    context.save()
    context.translate(x, y)
    context.scale(width / 900, height / 1200)
    context.fillStyle = '#f5f4f0'
    context.fillRect(0, 0, 900, 1200)
    context.strokeStyle = '#d8d6d0'
    context.lineWidth = 3
    context.beginPath()
    context.roundRect(58, 58, 784, 1084, 36)
    context.stroke()
    context.fillStyle = '#ff5232'
    context.beginPath()
    context.roundRect(84, 92, 128, 42, 21)
    context.fill()
    context.fillStyle = '#fff'
    context.font = '700 19px Arial'
    context.textAlign = 'center'
    context.fillText('CONTACT', 148, 120)
    context.fillStyle = '#171715'
    context.font = '700 76px "Microsoft YaHei", Arial'
    context.textAlign = 'left'
    context.fillText('联系沟通', 84, 246)
    context.fillStyle = '#74716b'
    context.font = '24px "Microsoft YaHei", Arial'
    context.fillText('有想法？留下一句话', 84, 298)
    context.fillStyle = '#fff'
    context.strokeStyle = '#dedcd6'
    context.beginPath()
    context.roundRect(222, 378, 456, 456, 36)
    context.fill()
    context.stroke()
    if (qrTexture.image) {
      const maxQrSize = 410
      const qrScale = Math.min(maxQrSize / qrTexture.image.width, maxQrSize / qrTexture.image.height)
      const qrWidth = qrTexture.image.width * qrScale
      const qrHeight = qrTexture.image.height * qrScale
      context.drawImage(qrTexture.image, 450 - qrWidth / 2, 606 - qrHeight / 2, qrWidth, qrHeight)
    }
    context.fillStyle = '#8a8780'
    context.font = '20px "Microsoft YaHei", Arial'
    context.textAlign = 'center'
    context.fillText('扫码联系我', 450, 872)
    context.fillStyle = '#171715'
    context.beginPath(); context.roundRect(84, 942, 732, 94, 47); context.fill()
    context.fillStyle = '#fff'
    context.font = '23px "Microsoft YaHei", Arial'
    context.textAlign = 'left'
    context.fillText('你想聊些什么？', 126, 999)
    context.fillStyle = '#ff5232'
    context.beginPath(); context.arc(765, 989, 31, 0, Math.PI * 2); context.fill()
    context.fillStyle = '#fff'
    context.font = '28px Arial'
    context.textAlign = 'center'
    context.fillText('↗', 765, 999)
    context.fillStyle = '#77736d'
    context.font = '18px Arial'
    context.textAlign = 'left'
    context.fillText(cardEmail, 84, 1094)
    context.fillStyle = '#ff5232'
    context.font = '700 18px Arial'
    context.textAlign = 'right'
    context.fillText('MIA · AI PRODUCT', 816, 1094)
    context.restore()

    const backX = BACK_UV_RECT.x * canvas.width
    const backY = BACK_UV_RECT.y * canvas.height
    const backWidth = BACK_UV_RECT.w * canvas.width
    const backHeight = BACK_UV_RECT.h * canvas.height
    context.save()
    context.translate(backX, backY)
    context.scale(backWidth / 900, backHeight / 1200)
    context.fillStyle = '#f5f4f0'
    context.fillRect(0, 0, 900, 1200)
    context.strokeStyle = '#d8d6d0'
    context.lineWidth = 3
    context.beginPath()
    context.roundRect(58, 58, 784, 1084, 36)
    context.stroke()
    context.fillStyle = '#ff5232'
    context.beginPath()
    context.roundRect(84, 92, 128, 42, 21)
    context.fill()
    context.fillStyle = '#fff'
    context.font = '700 19px Arial'
    context.textAlign = 'center'
    context.fillText('PROFILE', 148, 120)
    if (logoTexture.image) {
      const maxLogoWidth = 560
      const maxLogoHeight = 350
      const logoScale = Math.min(maxLogoWidth / logoTexture.image.width, maxLogoHeight / logoTexture.image.height)
      const logoWidth = logoTexture.image.width * logoScale
      const logoHeight = logoTexture.image.height * logoScale
      context.drawImage(logoTexture.image, (900 - logoWidth) / 2, 350, logoWidth, logoHeight)
    }
    context.fillStyle = '#171715'
    context.font = '700 62px Arial'
    context.textAlign = 'center'
    context.fillText("MIA'S PROFILE", 450, 870)
    context.fillStyle = '#77736d'
    context.font = '20px Arial'
    context.fillText('AI PRODUCT · EXPERIENCE · GROWTH', 450, 920)
    context.fillStyle = '#ff5232'
    context.beginPath()
    context.arc(450, 1040, 12, 0, Math.PI * 2)
    context.fill()
    context.restore()

    const result = new THREE.CanvasTexture(canvas)
    result.colorSpace = THREE.SRGBColorSpace
    result.flipY = baseMap.flipY
    result.anisotropy = 16
    result.needsUpdate = true
    return result
  }, [cardEmail, logoTexture, materials.base.map, qrTexture])
  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
  ]))
  const [dragged, setDragged] = useState(false)
  const [hovered, setHovered] = useState(false)
  const segmentProps = { canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 }

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]])

  useEffect(() => {
    if (!hovered) return undefined
    document.body.style.cursor = dragged ? 'grabbing' : 'grab'
    return () => { document.body.style.cursor = 'auto' }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      })
    }

    if (!fixed.current || !band.current) return
    ;[j1, j2].forEach((ref) => {
      if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
      const distance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
      ref.current.lerped.lerp(ref.current.translation(), delta * distance * 50)
    })
    curve.points[0].copy(j3.current.translation())
    curve.points[1].copy(j2.current.lerped)
    curve.points[2].copy(j1.current.lerped)
    curve.points[3].copy(fixed.current.translation())
    band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32))
    ang.copy(card.current.angvel())
    rot.copy(card.current.rotation())
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
  })

  curve.curveType = 'chordal'
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.844, 1.125, 0.01]} />
          <group
            scale={[2.374, 2.25, 2.25]}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(event) => {
              event.target.releasePointerCapture(event.pointerId)
              setDragged(false)
            }}
            onPointerDown={(event) => {
              event.stopPropagation()
              event.target.setPointerCapture(event.pointerId)
              setDragged(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation())))
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={cardMap} map-anisotropy={16} clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.35} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={isMobile ? [1000, 2000] : [1000, 1000]} useMap map={texture} repeat={[-4, 1]} lineWidth={1} />
      </mesh>
    </>
  )
}

useGLTF.preload(cardGLB)
