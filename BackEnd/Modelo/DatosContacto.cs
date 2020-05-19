using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd.Modelo
{
    public class DatosContacto
    {
        public int id_empresa { get; set; }
        public string nombre { get; set; }
        public string email { get; set; }
        public string email_usuario { get; set; }
        public int id_estado { get; set; }
        public int id_municipio { get; set; }
        public int codigo_postal { get; set; }
        public string domicilio { get; set; }
        public string giro { get; set; }
        public string sector { get; set; }
        public string telefono { get; set; }
        public string mision { get; set; }
        public string estado { get; set; }
        public string municipio { get; set; }
        public DatosContacto() { }

        public DatosContacto(int id_empresa, string nombre, string email, int id_estado, int id_municipio, int codigo_postal,
            string domicilio, string giro, string sector, string telefono, string mision)
        {
            this.id_empresa = id_empresa;
            this.nombre = nombre;
            this.email = email;
            this.id_estado = id_estado;
            this.id_municipio = id_municipio;
            this.codigo_postal = codigo_postal;
            this.domicilio = domicilio;
            this.giro = giro;
            this.sector = sector;
            this.telefono = telefono;
            this.mision = mision;
        }
        public DatosContacto(string nombre, string email, int id_estado, int id_municipio, int codigo_postal,
    string domicilio, string giro, string sector, string telefono, string mision, string email_usuario)
        {
            this.nombre = nombre;
            this.email = email;
            this.id_estado = id_estado;
            this.id_municipio = id_municipio;
            this.codigo_postal = codigo_postal;
            this.domicilio = domicilio;
            this.giro = giro;
            this.sector = sector;
            this.telefono = telefono;
            this.mision = mision;
            this.email_usuario = email_usuario;
        }
        public DatosContacto(int id_empresa, string nombre, string email, string estado, string municipio, string domicilio, int codigo_postal, string telefono)
        {
            this.id_empresa = id_empresa;
            this.nombre = nombre;
            this.email = email;
            this.estado = estado;
            this.municipio = municipio;
            this.domicilio = domicilio;
            this.codigo_postal = codigo_postal;
            this.telefono = telefono;
        }
        public override string ToString()
        {
            return nombre + ", " + email + ", " + id_estado + "," + id_municipio + ", " + codigo_postal + ", " + domicilio + ", " +
                giro + ", " + sector + "," + telefono + ", " + mision;
        }

    }
}

