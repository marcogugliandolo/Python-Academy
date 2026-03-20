import { DebugChallenge } from '../types';

export const debugChallenges: DebugChallenge[] = [
  {
    id: 'd1',
    title: 'El misterio de los dos puntos',
    brokenCode: 'puntuacion = 100\n\nif puntuacion > 50\n    print("¡Ganaste!")',
    errorOutput: 'SyntaxError: expected \':\'',
    question: 'Python es muy estricto con la sintaxis. ¿Qué símbolo falta al final de la línea del `if` para indicar que empieza un bloque de código?',
    validate: (code) => {
      const c = code.replace(/\s/g, '');
      return c.includes('ifpuntuacion>50:');
    },
    explanation: '¡Correcto! En Python, las estructuras de control como `if`, `for` y `while` siempre deben terminar con dos puntos (`:`).'
  },
  {
    id: 'd2',
    title: 'La variable fantasma',
    brokenCode: 'mensaje = "Hola, jugador"\n\nprint(mensje)',
    errorOutput: 'NameError: name \'mensje\' is not defined',
    question: 'El programa intenta imprimir una variable, pero Python dice que no está definida. Revisa cuidadosamente cómo se llama la variable cuando se creó y cómo se llama cuando se imprime.',
    validate: (code) => {
      const c = code.replace(/\s/g, '');
      return c.includes('print(mensaje)');
    },
    explanation: '¡Bien hecho! Un error tipográfico (typo) es una de las causas más comunes de errores. Python distingue entre mayúsculas, minúsculas y requiere que los nombres sean exactos.'
  },
  {
    id: 'd3',
    title: 'Mezcla incompatible',
    brokenCode: 'nivel = 5\ntexto = "Estás en el nivel " + nivel\nprint(texto)',
    errorOutput: 'TypeError: can only concatenate str (not "int") to str',
    question: 'Estás intentando sumar (concatenar) un texto (str) con un número (int). Python no sabe cómo mezclarlos directamente. ¿Qué función puedes usar para convertir el número a texto? (Pista: empieza con s)',
    validate: (code) => {
      const c = code.replace(/\s/g, '');
      return c.includes('str(nivel)') || c.includes('f"Estásenelnivel{nivel}"');
    },
    explanation: '¡Solucionado! Para unir texto y números, debes convertir el número a string usando `str()` o usar f-strings (`f"Texto {variable}"`).'
  }
];
