import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Calculadora de Daño',
    description: 'Construye un sistema para calcular el daño de un ataque en un videojuego.',
    iconName: 'Calculator',
    steps: [
      {
        id: 'p1s1',
        instruction: 'Paso 1: Define las estadísticas base. Crea una variable `ataque` con valor 50 y `defensa` con valor 20.',
        initialCode: '# Define ataque y defensa\n',
        validate: (code) => {
          const c = code.replace(/\s/g, '');
          return c.includes('ataque=50') && c.includes('defensa=20');
        },
        successMessage: '¡Estadísticas base configuradas!',
        unlockedFeature: 'Módulo de Estadísticas Activado 📊'
      },
      {
        id: 'p1s2',
        instruction: 'Paso 2: Calcula el daño neto. Crea una variable `dano_neto` que sea la resta de `ataque` menos `defensa`.',
        initialCode: 'ataque = 50\ndefensa = 20\n# Calcula el dano_neto\n',
        validate: (code) => {
          const c = code.replace(/\s/g, '');
          return c.includes('dano_neto=ataque-defensa') || c.includes('dano_neto=50-20');
        },
        successMessage: '¡Fórmula de daño implementada!',
        unlockedFeature: 'Motor de Combate En Línea ⚔️'
      },
      {
        id: 'p1s3',
        instruction: 'Paso 3: Multiplicador crítico. Si el daño neto es mayor a 20, crea una variable `critico` igual a `True`.',
        initialCode: 'dano_neto = 30\n# Escribe tu condición if\n',
        validate: (code) => {
          const c = code.replace(/\s/g, '');
          return c.includes('ifdano_neto>20:') && c.includes('critico=True');
        },
        successMessage: '¡Sistema de críticos completado! Has terminado tu primer proyecto.',
        unlockedFeature: '¡Calculadora de Daño Completada! 🏆'
      }
    ]
  },
  {
    id: 'p2',
    title: 'Generador de Escudos',
    description: 'Programa la lógica para activar escudos de energía usando bucles.',
    iconName: 'Shield',
    steps: [
      {
        id: 'p2s1',
        instruction: 'Paso 1: Inicializa la energía. Crea una variable `energia_escudo` en 0.',
        initialCode: '# Inicializa la energía\n',
        validate: (code) => code.replace(/\s/g, '').includes('energia_escudo=0'),
        successMessage: 'Baterías preparadas.',
        unlockedFeature: 'Baterías Conectadas 🔋'
      },
      {
        id: 'p2s2',
        instruction: 'Paso 2: Carga el escudo. Usa un bucle `for i in range(5):` para sumar 20 a `energia_escudo` en cada iteración.',
        initialCode: 'energia_escudo = 0\n# Escribe tu bucle for\n',
        validate: (code) => {
          const c = code.replace(/\s/g, '');
          return c.includes('foriinrange(5):') && (c.includes('energia_escudo=energia_escudo+20') || c.includes('energia_escudo+=20'));
        },
        successMessage: '¡Bucle de carga funcionando!',
        unlockedFeature: 'Generador al 100% 🛡️'
      }
    ]
  }
];
