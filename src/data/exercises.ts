import { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: 'ex1',
    title: 'Calculadora de Propinas',
    description: 'Escribe un programa que calcule el 15% de propina para una cuenta de 50. Usa la función `print()` para mostrar el resultado.',
    starterCode: 'cuenta = 50\n# Calcula la propina (15%) y usa print() para mostrarla\n',
    validate: (code: string, output: string) => {
      const trimmedOutput = output.trim();
      if (trimmedOutput === '7.5') {
        return { success: true, feedback: '¡Perfecto! Has calculado la propina correctamente (7.5).' };
      }
      if (!code.includes('print')) {
        return { success: false, feedback: '¡Casi! Recuerda usar la función print() para mostrar el resultado en la consola.' };
      }
      return { success: false, feedback: `El resultado no es correcto. Obtuviste "${trimmedOutput}". El 15% de 50 es 50 * 0.15.` };
    },
    xpReward: 20
  },
  {
    id: 'ex2',
    title: 'Saludo Personalizado',
    description: 'Crea una variable `nombre` con el valor "Python". Luego, usa `print()` para mostrar el mensaje "Hola Python".',
    starterCode: '# Crea la variable nombre y luego imprime el saludo\n',
    validate: (code: string, output: string) => {
      const trimmedOutput = output.trim();
      if (trimmedOutput === 'Hola Python') {
        return { success: true, feedback: '¡Excelente! Has concatenado e impreso el saludo correctamente.' };
      }
      if (!code.includes('nombre')) {
        return { success: false, feedback: 'Asegúrate de crear una variable llamada `nombre`.' };
      }
      return { success: false, feedback: `Tu salida fue "${trimmedOutput}". Asegúrate de imprimir exactamente "Hola Python".` };
    },
    xpReward: 20
  },
  {
    id: 'ex3',
    title: 'Contador Regresivo',
    description: 'Usa un bucle `while` para imprimir los números del 3 al 1 (en líneas separadas), y luego imprime "¡Despegue!".',
    starterCode: 'contador = 3\n# Usa un bucle while aquí\n',
    validate: (code: string, output: string) => {
      const expected = '3\n2\n1\n¡Despegue!';
      const trimmedOutput = output.trim();
      if (trimmedOutput === expected) {
        return { success: true, feedback: '¡Despegue exitoso! Has dominado el bucle while.' };
      }
      if (!code.includes('while')) {
        return { success: false, feedback: 'Debes usar la palabra clave `while` para crear el bucle.' };
      }
      return { success: false, feedback: `La salida no coincide. Esperaba:\n3\n2\n1\n¡Despegue!\n\nPero obtuviste:\n${trimmedOutput}` };
    },
    xpReward: 30
  },
  {
    id: 'ex4',
    title: 'Filtrar Pares',
    description: 'Dada una lista de números, usa un bucle `for` y un `if` para imprimir SOLO los números pares.',
    starterCode: 'numeros = [1, 2, 3, 4, 5, 6]\n# Itera sobre la lista e imprime solo los pares\n',
    validate: (code: string, output: string) => {
      const expected = '2\n4\n6';
      const trimmedOutput = output.trim();
      if (trimmedOutput === expected) {
        return { success: true, feedback: '¡Genial! Has combinado bucles y condicionales a la perfección.' };
      }
      if (!code.includes('% 2')) {
        return { success: false, feedback: 'Pista: Para saber si un número es par, verifica si el resto de dividirlo entre 2 es cero (`numero % 2 == 0`).' };
      }
      return { success: false, feedback: `Tu salida fue:\n${trimmedOutput}\n\nAsegúrate de imprimir solo 2, 4 y 6.` };
    },
    xpReward: 40
  }
];
