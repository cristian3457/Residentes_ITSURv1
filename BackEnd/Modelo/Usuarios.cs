using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd.Modelo
{
    public class Usuarios
    {
        public int id_usuario { get; set; }
        public String email { get; set; }
        public String password { get; set; }
        public String tipo_usuario { get; set; }
        public Usuarios()
        {

        }
        public Usuarios(int id_usuario, string email, string password, string tipo_usuario)
        {
            this.id_usuario = id_usuario;
            this.email = email;
            this.password = password;
            this.tipo_usuario = tipo_usuario;
        }
        public override string ToString()
        {
            return email + ", " + password + "," + tipo_usuario;
        }
    }
}

