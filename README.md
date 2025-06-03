# Galáxia Interativa - Obra 3D

Uma composição tridimensional interativa criada com p5.js e WEBGL, representando um sistema solar com planetas orbitando uma estrela central.

## 🎨 Descrição da Obra

**Título:** Galáxia Interativa

**Descrição:** Um sistema solar em miniatura com 4 planetas únicos orbitando um sol central brilhante, cada um com materiais e velocidades diferentes. A obra permite exploração através do controle de câmera via mouse e interação com teclado para zoom, criando uma experiência imersiva de navegação espacial.

## 🎮 Interações

- **Mouse:** Mova o mouse para rotacionar a câmera e explorar diferentes ângulos
- **Clique:** Alterne entre 3 velocidades de animação (normal, rápida, lenta)
- **Setas ↑↓:** Controle do zoom (aproximar/afastar)
- **Tecla R:** Reset da posição da câmera

## ✅ Requisitos Atendidos

### Formas 3D
- Sol central (esfera com material emissivo)
- 4 planetas com tamanhos diferentes (esferas)
- Luas orbitando planetas maiores
- 200 estrelas de fundo
- Anéis solares decorativos

### Transformações Espaciais
- **rotate():** Rotação orbital dos planetas, rotação própria, inclinação
- **translate():** Posicionamento dos planetas nas órbitas, luas, estrelas

### Materiais
- **emissiveMaterial():** Sol e planeta verde (brilho próprio)
- **ambientMaterial():** Planeta vermelho e luas
- **specularMaterial():** Planeta azul (reflexivo)
- **normalMaterial():** Planeta amarelo (multicolorido)

### Iluminação
- **ambientLight():** Luz ambiente fraca
- **directionalLight():** Luz solar principal
- **pointLight():** Luz central do sol + luz colorida móvel

### Animação/Interação
- Movimento orbital automático dos planetas
- Rotação própria de todos os objetos
- Controle de câmera responsivo ao mouse
- Zoom interativo com teclado
- Mudança de velocidade por clique

## 🚀 Como Executar

1. Abra o arquivo `index.html` em um navegador web moderno
2. A obra carregará automaticamente
3. Use os controles descritos acima para interagir

## 🛠️ Tecnologias

- p5.js (biblioteca principal)
- WEBGL (renderização 3D)
- HTML5 + CSS3
- JavaScript ES6+

---

*Criado para o exercício de Obra 3D Interativa* 