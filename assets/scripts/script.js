function validarFormulario(form) {
  if (!form.checkValidity()) {
    alert('Por favor, completa todos los campos correctamente.');
    return false;
  }
  return true;
}

/**
 * @param {'paciente'|'especialista'} role 
 * @param {Object} data 
 * @returns {boolean}
 */
function confirmarEnvio(role, data) {
  let mensaje;
  if (role === 'paciente') {
    mensaje = 
      `Hola ${data.nombre} (edad: ${data.edad}),\n` +
      `¿confirmas que deseas registrarte como paciente en NutriCheck?`;
  } else if (role === 'especialista') {
    mensaje = 
      `Hola Dr/a ${data.nombre} (especialidad: ${data.especialidad}),\n` +
      `¿confirmas que deseas registrarte como especialista en NutriCheck?`;
  } else {
    mensaje = '¿Confirmas el envío de estos datos?';
  }
  return confirm(mensaje);
}

function mostrarExito(role, data) {
  let mensaje;
  if (role === 'paciente') {
    mensaje = 
      `¡Bienvenido, ${data.nombre}!\n` +
      `Tu registro como paciente (edad: ${data.edad}) se completó con éxito.`;
  } else if (role === 'especialista') {
    mensaje = 
      `¡Registro exitoso, Dr/a ${data.nombre}!\n` +
      `Hemos guardado tu especialidad: ${data.especialidad}.`;
  } else {
    mensaje = '¡Registro completado con éxito!';
  }
  alert(mensaje);
}


function enviarDatos(role, data) {

  setTimeout(() => {
    mostrarExito(role, data);
    document.getElementById('registroForm').reset();
  }, 500);
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroForm');
  if (!form) return;


  const role = document.getElementById('edad')
    ? 'paciente'
    : document.getElementById('especialidad')
      ? 'especialista'
      : null;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validarFormulario(form)) return;

    const data = {
      nombre:   document.getElementById('nombre').value,
      correo:   document.getElementById('correo').value,
      password: document.getElementById('password').value,
    };
    if (role === 'paciente') {
      data.edad = document.getElementById('edad').value;
    } else if (role === 'especialista') {
      data.especialidad = document.getElementById('especialidad').value;
    }

    if (!confirmarEnvio(role, data)) {
      alert('Registro cancelado.');
      return;
    }
    enviarDatos(role, data);
  });
});