import { gql, useMutation } from "@apollo/client";

function borrarTarea(id) {
  const MUTATION = gql`
    mutation deleteTarea($input: TareaInput) {
      deleteTarea(input: $input) {
        titulo
      }
    }
  `;

  const [deleteTarea, {}] = useMutation(MUTATION)
    .then(() => alert("Tarea eliminada"))
    .catch(() => alert("No se pudo eliminar la tarea"));

  deleteTarea({
    variables: {
      input: {
        _id: id,
      },
    },
  });
}

export default borrarTarea;
