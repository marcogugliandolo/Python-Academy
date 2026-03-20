export interface Level {
  id: number;
  title: string;
  instruction: string;
  initialCode: string;
  validate: (code: string) => boolean;
  successMessage: string;
  hint: string;
}

export const levels: Level[] = [
  {
    id: 1,
    title: "Nivel 1: El Núcleo (Variables)",
    instruction: "En Python, usamos variables para guardar información. Crea una variable llamada 'energia' y asígnale el valor 100 para encender el núcleo de tu robot.",
    initialCode: "# Enciende el núcleo\n",
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '');
      return cleaned.includes('energia=100');
    },
    successMessage: "¡Excelente! Has encendido el núcleo de energía. Las variables son la base de todo programa.",
    hint: "Escribe: energia = 100"
  },
  {
    id: 2,
    title: "Nivel 2: El Motor (Matemáticas)",
    instruction: "Python es una calculadora poderosa. Crea una variable 'potencia' que sea el resultado de multiplicar la 'energia' por 5.",
    initialCode: "energia = 100\n# Calcula la potencia\n",
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '');
      return cleaned.includes('potencia=energia*5') || cleaned.includes('potencia=100*5');
    },
    successMessage: "¡Motor a máxima capacidad! Has aprendido a usar operadores matemáticos (* para multiplicar).",
    hint: "Usa el operador * para multiplicar: potencia = energia * 5"
  },
  {
    id: 3,
    title: "Nivel 3: El Interruptor (Condicionales)",
    instruction: "Los programas toman decisiones con 'if'. Si la potencia es mayor a 50, crea una variable 'estado' con el valor 'activo' (entre comillas).",
    initialCode: "potencia = 500\n# Escribe tu condición aquí\n",
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '');
      return (cleaned.includes('ifpotencia>50:') || cleaned.includes('if(potencia>50):')) && 
             (cleaned.includes('estado=\'activo\'') || cleaned.includes('estado="activo"'));
    },
    successMessage: "¡Sistemas en línea! Los condicionales permiten que tu código sea inteligente.",
    hint: "Escribe:\nif potencia > 50:\n    estado = 'activo'"
  },
  {
    id: 4,
    title: "Nivel 4: Ensamblaje (Bucles)",
    instruction: "Los bucles repiten acciones. Usa un bucle 'for' para repetir 3 veces la creación de una variable 'brazo' con el valor 'listo'.",
    initialCode: "# Repite 3 veces\n",
    validate: (code) => {
      const cleaned = code.replace(/\s/g, '');
      return cleaned.includes('foriinrange(3):') && 
             (cleaned.includes('brazo=\'listo\'') || cleaned.includes('brazo="listo"'));
    },
    successMessage: "¡Brazos robóticos ensamblados! Los bucles te ahorran escribir el mismo código muchas veces.",
    hint: "Escribe:\nfor i in range(3):\n    brazo = 'listo'"
  }
];
