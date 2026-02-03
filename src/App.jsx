import { useState, useMemo, useEffect } from 'react'
import './App.css'

const STORAGE_KEY = 'mindmap-data'

const initialNodes = {
  'root': { id: 'root', label: 'Modale Werkwoorden', parentId: null, children: ['kunnen', 'moeten', 'mogen', 'willen', 'zullen', 'hoeven'] },
  
  'kunnen': { id: 'kunnen', label: 'KUNNEN', parentId: 'root', children: ['kunnen-conjugatie', 'kunnen-imperfectum'] },
  
  'kunnen-conjugatie': { id: 'kunnen-conjugatie', label: 'Conjugatie', parentId: 'kunnen', children: ['kunnen-conjugatie-svb', 'kunnen-conjugatie-uvb', 'kunnen-conjugatie-pvb'] },
  'kunnen-conjugatie-svb': { id: 'kunnen-conjugatie-svb', label: 'ik/hij kan', parentId: 'kunnen-conjugatie', children: [] },
  'kunnen-conjugatie-uvb': { id: 'kunnen-conjugatie-uvb', label: 'jij kunt', parentId: 'kunnen-conjugatie', children: [] },
  'kunnen-conjugatie-pvb': { id: 'kunnen-conjugatie-pvb', label: 'wij/jullie/zij kunnen', parentId: 'kunnen-conjugatie', children: [] },
  
  'kunnen-imperfectum': { id: 'kunnen-imperfectum', label: 'Imperfectum', parentId: 'kunnen', children: ['kunnen-imperfectum-svb', 'kunnen-imperfectum-pvb'] },
  'kunnen-imperfectum-svb': { id: 'kunnen-imperfectum-svb', label: 'ik/jij/hij kon', parentId: 'kunnen-imperfectum', children: [] },
  'kunnen-imperfectum-pvb': { id: 'kunnen-imperfectum-pvb', label: 'wij/jullie/zij konden', parentId: 'kunnen-imperfectum', children: [] },

  'moeten': { id: 'moeten', label: 'MOETEN', parentId: 'root', children: ['moeten-conjugatie', 'moeten-imperfectum'] },
  
  'moeten-conjugatie': { id: 'moeten-conjugatie', label: 'Conjugatie', parentId: 'moeten', children: ['moeten-conjugatie-svb', 'moeten-conjugatie-pvb'] },
  'moeten-conjugatie-svb': { id: 'moeten-conjugatie-svb', label: 'ik/jij/hij moet', parentId: 'moeten-conjugatie', children: [] },
  'moeten-conjugatie-pvb': { id: 'moeten-conjugatie-pvb', label: 'wij/jullie/zij moeten', parentId: 'moeten-conjugatie', children: [] },

  'moeten-imperfectum': { id: 'moeten-imperfectum', label: 'Imperfectum', parentId: 'moeten', children: ['moeten-imperfectum-svb', 'moeten-imperfectum-pvb'] },
  'moeten-imperfectum-svb': { id: 'moeten-imperfectum-svb', label: 'ik/jij/hij moest', parentId: 'moeten-imperfectum', children: [] },
  'moeten-imperfectum-pvb': { id: 'moeten-imperfectum-pvb', label: 'wij/jullie/zij moesten', parentId: 'moeten-imperfectum', children: [] },
  
  'mogen': { id: 'mogen', label: 'MOGEN', parentId: 'root', children: ['mogen-conjugatie', 'mogen-imperfectum'] },
  
  'mogen-conjugatie': { id: 'mogen-conjugatie', label: 'Conjugatie', parentId: 'mogen', children: ['mogen-conjugatie-svb', 'mogen-conjugatie-pvb'] },
  'mogen-conjugatie-svb': { id: 'mogen-conjugatie-svb', label: 'ik/jij/hij mag', parentId: 'mogen-conjugatie', children: [] },
  'mogen-conjugatie-pvb': { id: 'mogen-conjugatie-pvb', label: 'wij/jullie/zij mogen', parentId: 'mogen-conjugatie', children: [] },
  
  'mogen-imperfectum': { id: 'mogen-imperfectum', label: 'Imperfectum', parentId: 'mogen', children: ['mogen-imperfectum-svb', 'mogen-imperfectum-pvb'] },
  'mogen-imperfectum-svb': { id: 'mogen-imperfectum-svb', label: 'ik/jij/hij macht', parentId: 'mogen-imperfectum', children: [] },
  'mogen-imperfectum-pvb': { id: 'mogen-imperfectum-pvb', label: 'wij/jullie/zij mochten', parentId: 'mogen-imperfectum', children: [] },

  'willen': { id: 'willen', label: 'WILLEN', parentId: 'root', children: ['willen-conjugatie', 'willen-imperfectum'] },
  
  'willen-conjugatie': { id: 'willen-conjugatie', label: 'Conjugatie', parentId: 'willen', children: ['willen-conjugatie-svb', 'willen-conjugatie-uvb', 'willen-conjugatie-pvb'] },
  'willen-conjugatie-svb': { id: 'willen-conjugatie-svb', label: 'ik/hij wil', parentId: 'willen-conjugatie', children: [] },
  'willen-conjugatie-uvb': { id: 'willen-conjugatie-uvb', label: 'jij wilt', parentId: 'willen-conjugatie', children: [] },
  'willen-conjugatie-pvb': { id: 'willen-conjugatie-pvb', label: 'wij/jullie/zij willen', parentId: 'willen-conjugatie', children: [] },
  
  'willen-imperfectum': { id: 'willen-imperfectum', label: 'Imperfectum', parentId: 'willen', children: ['willen-imperfectum-svb', 'willen-imperfectum-pvb'] },
  'willen-imperfectum-svb': { id: 'willen-imperfectum-svb', label: 'ik/jij/hij wilde/wou', parentId: 'willen-imperfectum', children: [] },
  'willen-imperfectum-pvb': { id: 'willen-imperfectum-pvb', label: 'wij/jullie/zij wilden/wouden', parentId: 'willen-imperfectum', children: [] },
  
  'zullen': { id: 'zullen', label: 'ZULLEN', parentId: 'root', children: ['zullen-conjugatie', 'zullen-imperfectum'] },
  
  'zullen-conjugatie': { id: 'zullen-conjugatie', label: 'Conjugatie', parentId: 'zullen', children: ['zullen-conjugatie-svb', 'zullen-conjugatie-uvb', 'zullen-conjugatie-pvb'] },
  'zullen-conjugatie-svb': { id: 'zullen-conjugatie-svb', label: 'ik/hij zal', parentId: 'zullen-conjugatie', children: [] },
  'zullen-conjugatie-uvb': { id: 'zullen-conjugatie-uvb', label: 'jij zult', parentId: 'zullen-conjugatie', children: [] },
  'zullen-conjugatie-pvb': { id: 'zullen-conjugatie-pvb', label: 'wij/jullie/zij zullen', parentId: 'zullen-conjugatie', children: [] },

  'zullen-imperfectum': { id: 'zullen-imperfectum', label: 'Imperfectum', parentId: 'zullen', children: ['zullen-imperfectum-svb', 'zullen-imperfectum-pvb'] },
  'zullen-imperfectum-svb': { id: 'zullen-imperfectum-svb', label: 'ik/jij/hij zou', parentId: 'zullen-imperfectum', children: [] },
  'zullen-imperfectum-pvb': { id: 'zullen-imperfectum-pvb', label: 'wij/jullie/zij zouden', parentId: 'zullen-imperfectum', children: [] },

  'hoeven': { id: 'hoeven', label: 'HOEVEN', parentId: 'root', children: ['hoeven-conjugatie', 'hoeven-imperfectum'] },
  
  'hoeven-conjugatie': { id: 'hoeven-conjugatie', label: 'Conjugatie', parentId: 'hoeven', children: ['hoeven-conjugatie-svb','hoeven-conjugatie-uvb', 'hoeven-conjugatie-pvb'] },
  'hoeven-conjugatie-svb': { id: 'hoeven-conjugatie-svb', label: 'ik hoef', parentId: 'hoeven-conjugatie', children: [] },
  'hoeven-conjugatie-uvb': { id: 'hoeven-conjugatie-uvb', label: 'hij/jij hoeft', parentId: 'hoeven-conjugatie', children: [] },
  'hoeven-conjugatie-pvb': { id: 'hoeven-conjugatie-pvb', label: 'wij/jullie/zij hoeven', parentId: 'hoeven-conjugatie', children: [] },

  'hoeven-imperfectum': { id: 'hoeven-imperfectum', label: 'Imperfectum', parentId: 'hoeven', children: ['hoeven-imperfectum-svb', 'hoeven-imperfectum-pvb'] },
  'hoeven-imperfectum-svb': { id: 'hoeven-imperfectum-svb', label: 'ik/jij/hij hoefde', parentId: 'hoeven-imperfectum', children: [] },
  'hoeven-imperfectum-pvb': { id: 'hoeven-imperfectum-pvb', label: 'wij/jullie/zij hoefden', parentId: 'hoeven-imperfectum', children: [] },
}

function loadNodes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load from localStorage:', e)
  }
  return defaultNodes
}

function saveNodes(nodes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nodes))
  } catch (e) {
    console.error('Failed to save to localStorage:', e)
  }
}

const CONFIG = {
  nodeWidth: 180,
  nodeHeight: 40,
  horizontalGap: 60,
  verticalGap: 16,
  paddingX: 60,
  paddingY: 40,
}

const ROOT_COLOR = { fill: '#6366f1', stroke: '#4f46e5', text: '#ffffff' }

const BRANCH_COLORS = [
  { base: '#3b82f6', light: '#dbeafe', text: '#1e40af', lightText: '#1d4ed8' },
  { base: '#ef4444', light: '#fee2e2', text: '#991b1b', lightText: '#b91c1c' },
  { base: '#10b981', light: '#d1fae5', text: '#065f46', lightText: '#047857' }, 
  { base: '#f97316', light: '#ffedd5', text: '#9a3412', lightText: '#c2410c' },
  { base: '#8b5cf6', light: '#ede9fe', text: '#5b21b6', lightText: '#6d28d9' }, 
  { base: '#ec4899', light: '#fce7f3', text: '#9d174d', lightText: '#be185d' },  
  { base: '#14b8a6', light: '#ccfbf1', text: '#115e59', lightText: '#0f766e' },
  { base: '#f59e0b', light: '#fef3c7', text: '#92400e', lightText: '#b45309' },
]

const CONNECTION_COLOR = '#94a3b8'

function getBranchIndex(nodes, nodeId) {
  let current = nodes[nodeId]
  
  while (current && current.parentId && current.parentId !== 'root') {
    current = nodes[current.parentId]
  }
  

  if (current && current.parentId === 'root') {
    const rootChildren = nodes['root'].children
    return rootChildren.indexOf(current.id)
  }
  
  return 0
}

function getColor(nodes, nodeId, level) {
  if (level === 0) {
    return ROOT_COLOR
  }
  
  const branchIndex = getBranchIndex(nodes, nodeId)
  const branchColor = BRANCH_COLORS[branchIndex % BRANCH_COLORS.length]
  
  if (level === 1) {
    return {
      fill: branchColor.light,
      stroke: branchColor.base,
      text: branchColor.text
    }
  }

  if (level === 2) {
    return {
      fill: branchColor.light + '40',
      stroke: branchColor.base + '40',
      text: branchColor.text
    }
  }

  return {
    fill: branchColor.light + '20',
    stroke: branchColor.base + '20',
    text: branchColor.lightText
  }
}

function calculateLayout(nodes, rootId = 'root') {
  const positions = new Map()

  function getSubtreeHeight(nodeId) {
    const node = nodes[nodeId]
    if (!node.children || node.children.length === 0) {
      return CONFIG.nodeHeight
    }

    const childrenHeight = node.children.reduce((sum, childId) => {
      return sum + getSubtreeHeight(childId)
    }, 0)

    const gaps = (node.children.length - 1) * CONFIG.verticalGap
    return Math.max(CONFIG.nodeHeight, childrenHeight + gaps)
  }

  function positionNode(nodeId, x, yStart, yEnd, level) {
    const node = nodes[nodeId]
    const y = (yStart + yEnd) / 2

    positions.set(nodeId, { x, y, level })

    if (node.children && node.children.length > 0) {
      const childX = x + CONFIG.nodeWidth + CONFIG.horizontalGap
      let currentY = yStart

      node.children.forEach(childId => {
        const childHeight = getSubtreeHeight(childId)
        positionNode(childId, childX, currentY, currentY + childHeight, level + 1)
        currentY += childHeight + CONFIG.verticalGap
      })
    }
  }

  const totalHeight = getSubtreeHeight(rootId)
  positionNode(rootId, CONFIG.paddingX, CONFIG.paddingY, CONFIG.paddingY + totalHeight, 0)

  let maxX = 0, maxY = 0
  positions.forEach(pos => {
    maxX = Math.max(maxX, pos.x + CONFIG.nodeWidth)
    maxY = Math.max(maxY, pos.y + CONFIG.nodeHeight / 2)
  })

  return {
    positions,
    width: maxX + CONFIG.paddingX,
    height: maxY + CONFIG.paddingY,
  }
}

function getConnectionPath(fromPos, toPos) {
  const startX = fromPos.x + CONFIG.nodeWidth
  const startY = fromPos.y
  const endX = toPos.x
  const endY = toPos.y

  const midX = (startX + endX) / 2

  return `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`
}

function Node({ node, position, isSelected, onSelect, nodes }) {
  const colors = getColor(nodes, node.id, position.level)
  const [hovered, setHovered] = useState(false)

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(node.id)}
      style={{ cursor: 'pointer' }}
    >
      <rect
        x={position.x}
        y={position.y - CONFIG.nodeHeight / 2}
        width={CONFIG.nodeWidth}
        height={CONFIG.nodeHeight}
        rx="8"
        fill={colors.fill}
        stroke={isSelected ? '#3b82f6' : colors.stroke}
        strokeWidth={isSelected ? 3 : 2}
        style={{
          filter: hovered ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' : 'none',
          transition: 'filter 0.15s ease, stroke 0.15s ease'
        }}
      />
      <text
        x={position.x + CONFIG.nodeWidth / 2}
        y={position.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={colors.text}
        fontSize="13"
        fontWeight="600"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.label}
      </text>
    </g>
  )
}

function Connection({ fromPos, toPos }) {
  return (
    <path
      d={getConnectionPath(fromPos, toPos)}
      fill="none"
      stroke={CONNECTION_COLOR}
      strokeWidth="2"
      strokeLinecap="round"
    />
  )
}

function MindMap() {
  const [nodes, setNodes] = useState(loadNodes)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    saveNodes(nodes)
  }, [nodes])

  const { positions, width, height } = useMemo(
    () => calculateLayout(nodes),
    [nodes]
  )

  const connections = useMemo(() => {
    const conns = []
    Object.values(nodes).forEach(node => {
      if (node.children) {
        node.children.forEach(childId => {
          conns.push({
            id: `${node.id}-${childId}`,
            fromId: node.id,
            toId: childId,
          })
        })
      }
    })
    return conns
  }, [nodes])

  const handleBackgroundClick = (e) => {
    if (e.target.tagName === 'svg') {
      setSelectedId(null)
    }
  }

  return (
    <svg
      width={width}
      height={height}
      onClick={handleBackgroundClick}
      style={{ display: 'block' }}
    >
      {connections.map(conn => (
        <Connection
          key={conn.id}
          fromPos={positions.get(conn.fromId)}
          toPos={positions.get(conn.toId)}
        />
      ))}

      {Object.values(nodes).map(node => (
        <Node
          key={node.id}
          node={node}
          position={positions.get(node.id)}
          isSelected={selectedId === node.id}
          onSelect={setSelectedId}
          nodes={nodes}
        />
      ))}
    </svg>
  )
}

function App() {
  return (
    <div className="app">
      <div className="mindmap-container">
        <MindMap />
      </div>
    </div>
  )
}

export default App