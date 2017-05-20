$(() => {
  console.info('\n%cOla K Ase?, Aprendiendo %cAJAX con JQuery!, %c¿o K Ase?', 'color: teal;font-size:1.5em; ', 'color: tomato;font-size:1.5em;', 'color: teal;font-size:1.5em;');
  requestAjax('https://www.codeschool.com/users/2281256.json')

  // Modulo Ajax  
  function requestAjax (url) {
    return $.ajax({
      url      : url,
      dataType : 'jsonp',
      success  : function(response) {
        let NoCursosCompletados  = response.courses.completed.length
        console.time('responseTime')
        buildUser(response.user, NoCursosCompletados)
        buildCourses(response.courses.completed)
        console.timeEnd('responseTime')
      }
    }); 
  }

  /* Contruye seccion HTML con los badges de CodeSchool */
  function buildCourses (courses) {

    var $badges = $('#badges');
    // console.table(courses)

    courses.forEach(function(course) {
    
      $div = $('<div />', {'class': 'course'}).appendTo($badges);

      $('<h3 />', { text: course.title}).appendTo($div);
      $('<img />', { src: course.badge}).appendTo($div);
      $('<a />', {
        'class' : 'btn btn-primary',
        target  : '_blank',
        href    : course.url,
        text    : 'See Course'
      }).appendTo($div);

    });
  }

  function buildUser(usuario, cursosCompletados) {
    // var $perfil_detalle = $('#perfil_detalle')
    // $('<p />', { text: usuario.username}).appendTo($perfil_detalle)

    var fecha_Miembro = new Date(usuario.member_since),
    options          = {weekday: "long", year: "numeric", month: "long", day: "numeric"}

    fecha_Miembro = fecha_Miembro.toLocaleDateString("es-ES", options)

    console.log('fecha:' ,fecha_Miembro)

    let perfil_detalle = `<div id="perfil_avatar" class="perfil_avatar col-xs-4 col-md-2">
                            <img id="imagen"  src="https://pbs.twimg.com/profile_images/540669602540580864/tX28kyut.jpeg"  alt class="img-responsive img-circle">
                          </div>
                          <div id="perfil_detalle" class="col-xs-8 col-md-10">
                            <p> <i class="glyphicon glyphicon-user"> </i>   ${usuario.username}</p>
                            <ul class="detalle">
                              <li><strong>Miebro desde el : </strong> ${fecha_Miembro}</li>
                              <li><strong>Record Total: </strong> ${usuario.total_score}</li>
                              <li><strong>Cursos Completados: </strong> ${cursosCompletados}</li>
                            </ul>
                          </div>`

    $('#perfil').html(perfil_detalle)

  }

});

