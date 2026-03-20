import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'l1',
    title: '1. Variables y Cajas',
    theory: 'Una variable es como una caja con una etiqueta donde guardamos información. Usamos el signo `=` para guardar un valor en esa caja.',
    exampleCode: 'nombre = "Alex"\nedad = 25\nenergia = 100',
    instruction: 'Crea una variable llamada `puntuacion` y asígnale el valor numérico `50`.',
    initialCode: '# Escribe tu código aquí\n',
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '');
      return cleaned.includes('puntuacion=50');
    },
    successMessage: '¡Excelente! Has creado tu primera variable. Ahora puedes guardar datos en la memoria.'
  },
  {
    id: 'l2',
    title: '2. Tipos de Datos',
    theory: 'Python entiende diferentes tipos de datos: Textos (Strings) van entre comillas, Números enteros (Integers), Decimales (Floats) y Verdadero/Falso (Booleans).',
    exampleCode: 'texto = "Hola Mundo" # String\nnumero = 42 # Integer\nprecio = 19.99 # Float\nes_divertido = True # Boolean',
    instruction: 'Crea una variable `mensaje` con el texto "Hola" y una variable `activo` con el valor booleano `True`.',
    initialCode: '# Crea las dos variables\n',
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '');
      return (cleaned.includes('mensaje="Hola"') || cleaned.includes("mensaje='Hola'")) && 
             cleaned.includes('activo=True');
    },
    successMessage: '¡Perfecto! Conocer los tipos de datos te permite manipular la información correctamente.'
  },
  {
    id: 'l3',
    title: '3. Operadores Matemáticos',
    theory: 'Puedes usar Python como una calculadora. Usamos `+` (suma), `-` (resta), `*` (multiplicación) y `/` (división).',
    exampleCode: 'a = 10\nb = 5\nsuma = a + b\nmultiplicacion = a * b',
    instruction: 'Crea una variable `resultado` que sea la suma de 15 y 30.',
    initialCode: '# Calcula el resultado\n',
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '');
      return cleaned.includes('resultado=15+30') || cleaned.includes('resultado=45');
    },
    successMessage: '¡Matemáticas dominadas! Los operadores son esenciales para procesar datos.'
  },
  {
    id: 'l4',
    title: '4. Textos y Concatenación',
    theory: 'Podemos unir textos (Strings) usando el operador `+`. A esto se le llama concatenación.',
    exampleCode: 'saludo = "Hola"\nnombre = "Mundo"\nmensaje = saludo + " " + nombre',
    instruction: 'Crea una variable `nombre` con tu nombre (ej. "Ana"), y una variable `saludo` que una "Hola " y la variable nombre.',
    initialCode: 'nombre = "Ana"\n# Crea la variable saludo\n',
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '').replace(/'/g, '"');
      return cleaned.includes('saludo="Hola"+nombre') || cleaned.includes('saludo="Hola"+nombre');
    },
    successMessage: '¡Genial! Unir textos es súper útil para mostrar mensajes personalizados a los usuarios.'
  },
  {
    id: 'l5',
    title: '5. Listas (Colecciones)',
    theory: 'Una lista es como una mochila donde puedes guardar varios elementos ordenados. Se crean usando corchetes `[]` y separando los elementos con comas.',
    exampleCode: 'mochila = ["espada", "escudo", "poción"]\nprimer_item = mochila[0]',
    instruction: 'Crea una lista llamada `inventario` que contenga tres textos: "mapa", "brújula" y "agua".',
    initialCode: '# Crea tu lista aquí\n',
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '').replace(/'/g, '"');
      return cleaned.includes('inventario=["mapa","brújula","agua"]') || cleaned.includes('inventario=["mapa","brujula","agua"]');
    },
    successMessage: '¡Mochila lista! Las listas te permiten organizar mucha información en un solo lugar.'
  },
  {
    id: 'l6',
    title: '6. Condicionales (If / Else)',
    theory: 'Los condicionales permiten que el programa tome decisiones. Si (`if`) una condición es verdadera, hace algo. Si no (`else`), hace otra cosa. ¡Recuerda la indentación (espacios)!',
    exampleCode: 'vida = 0\nif vida <= 0:\n    print("Game Over")\nelse:\n    print("Sigue jugando")',
    instruction: 'Crea una variable `edad` con el valor 18. Luego escribe un `if` que verifique si `edad >= 18`. Si es así, crea una variable `es_mayor` igual a `True`.',
    initialCode: 'edad = 18\n# Escribe tu if aquí\n',
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '');
      return cleaned.includes('ifedad>=18:') && cleaned.includes('es_mayor=True');
    },
    successMessage: '¡Decisión correcta! Los condicionales son el cerebro de cualquier programa.'
  },
  {
    id: 'l7',
    title: '7. Bucles For (Repetición)',
    theory: 'Un bucle `for` nos permite repetir un bloque de código varias veces, por ejemplo, para recorrer cada elemento de una lista.',
    exampleCode: 'enemigos = ["goblin", "orco", "troll"]\nfor enemigo in enemigos:\n    print("Atacando a " + enemigo)',
    instruction: 'Dada la lista `numeros = [1, 2, 3]`, usa un bucle `for` para recorrerla (usa la variable `n`). Dentro del bucle, crea una variable `actual = n`.',
    initialCode: 'numeros = [1, 2, 3]\n# Escribe tu bucle for aquí\n',
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '');
      return cleaned.includes('forninnumeros:') && cleaned.includes('actual=n');
    },
    successMessage: '¡Bucle completado! Automatizar tareas repetitivas te ahorrará muchísimo tiempo.'
  },
  {
    id: 'l8',
    title: '8. Bucles While',
    theory: 'El bucle `while` repite código MIENTRAS una condición sea verdadera. ¡Cuidado con los bucles infinitos! Siempre debes cambiar la condición dentro del bucle.',
    exampleCode: 'contador = 3\nwhile contador > 0:\n    print(contador)\n    contador = contador - 1\nprint("¡Despegue!")',
    instruction: 'Crea una variable `energia = 5`. Escribe un `while` que se ejecute mientras `energia > 0`. Dentro, resta 1 a `energia`.',
    initialCode: 'energia = 5\n# Escribe tu bucle while aquí\n',
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '');
      return cleaned.includes('whileenergia>0:') && (cleaned.includes('energia=energia-1') || cleaned.includes('energia-=1'));
    },
    successMessage: '¡Energía controlada! Los bucles while son geniales para juegos y simulaciones continuas.'
  },
  {
    id: 'l9',
    title: '9. Funciones (Tu propio comando)',
    theory: 'Una función es un bloque de código reutilizable que hace una tarea específica. Se define con `def`. Puedes enviarle datos (parámetros) y puede devolverte un resultado (`return`).',
    exampleCode: 'def saludar(nombre):\n    return "Hola " + nombre\n\nmensaje = saludar("Alex")',
    instruction: 'Define una función `doble(numero)` que devuelva (`return`) el número multiplicado por 2.',
    initialCode: '# Define tu función aquí\n',
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '');
      return cleaned.includes('defdoble(numero):') && cleaned.includes('returnnumero*2');
    },
    successMessage: '¡Creador de comandos! Las funciones mantienen tu código limpio, organizado y reutilizable.'
  },
  {
    id: 'l10',
    title: '10. Diccionarios (Clave-Valor)',
    theory: 'Un diccionario guarda datos en pares de "clave" y "valor", como una agenda telefónica o el perfil de un jugador. Se usan llaves `{}`.',
    exampleCode: 'jugador = {\n    "nombre": "Heroe",\n    "nivel": 5\n}\nprint(jugador["nombre"])',
    instruction: 'Crea un diccionario llamado `mascota` con las claves `"tipo"` (valor "perro") y `"edad"` (valor 3).',
    initialCode: '# Crea tu diccionario aquí\n',
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '').replace(/'/g, '"');
      return cleaned.includes('mascota=') && cleaned.includes('"tipo":"perro"') && cleaned.includes('"edad":3');
    },
    successMessage: '¡Datos estructurados! Los diccionarios son la base para manejar información compleja y APIs.'
  }
];
