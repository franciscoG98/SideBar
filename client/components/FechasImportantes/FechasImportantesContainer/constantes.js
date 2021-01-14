import { gql } from "@apollo/client";

export const QUERY = gql`
  query fechasImportantes {
    fechasImportantes {
      titulo
      _id
      fecha
      descripcion
      imagen
    }
  }
`;

export const MUTATION = gql`
  mutation deleteFechasImportantes($input: FechasImportantesInput) {
    deleteFechasImportantes(input: $input) {
      titulo
    }
  }
`;

export const IMAGE = {
  uri:
    "https://d500.epimg.net/cincodias/imagenes/2019/08/14/lifestyle/1565783123_885485_1565783247_sumario_normal.jpg",
};
