## Enlaces a la aplicación en línea

A continuación se listan los siguientes enlaces que se pueden consultar:
- **Página de información**: *https://full-stack-phonebook-q19r.onrender.com/info*
- **Todas las personas**: *https://full-stack-phonebook-q19r.onrender.com/api/persons*
- **Persona con determinado id**: *https://full-stack-phonebook-q19r.onrender.com/api/persons/:id*, donde **:id** refiere a un número que debe indicar.

También es posible agregar y eliminar personas de la agenda, y puede probarlos con Postman o alguna herramienta que permita hacer este tipo de solicitudes al servidor:
- **Agregar una persona**: *https://full-stack-phonebook-q19r.onrender.com/api/persons*, eligiendo el método **POST** y pasando un **body** del siguiente estilo;
    ```
    {
        "name": nombre,
        "number": number
    }
    ```
- **Eliminar una persona**: *https://full-stack-phonebook-q19r.onrender.com/api/persons/:id*, donde **:id** refiere al id de la persona que quiere eliminar. Debe seleccionar el método **DELETE**.