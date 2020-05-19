using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd.Modelo
{
  public class Ofertas
    {

        public int id_oferta { get; set; }
        public String perfil { get; set; }
        public String carrera { get; set; }
        public String sueldo { get; set; }
        public String solicito { get; set; }
        public String requisitos { get; set; }
        public String actividades { get; set; }
        public String email { get; set; }
        public String nombre { get; set; }
        public String domicilio { get; set; }
        public int codigo_postal { get; set; }
        public String telefono { get; set; }
        public String municipio { get; set; }
        public String estado { get; set; }
        public Ofertas()
        {

        }
        public Ofertas(int id_oferta, string perfil, string carrera, string sueldo, string solicito, string requisitos, string actividades, string email)
        {
            this.id_oferta = id_oferta;
            this.perfil = perfil;
            this.carrera = carrera;
            this.sueldo = sueldo;
            this.solicito = solicito;
            this.requisitos = requisitos;
            this.actividades = actividades;
            this.email = email;
        }
        public Ofertas(int id_oferta, string nombre, string domicilio, int codigo_postal, string email, string telefono, string municipio, string estado,
                        string perfil, string sueldo, string solicito, string requisitos, string actividades)
        {
            this.id_oferta = id_oferta;
            this.nombre = nombre;
            this.domicilio = domicilio;
            this.codigo_postal = codigo_postal;
            this.email = email;
            this.telefono = telefono;
            this.municipio = municipio;
            this.estado = estado;
            this.perfil = perfil;
            this.sueldo = sueldo;
            this.solicito = solicito;
            this.requisitos = requisitos;
            this.actividades = actividades;
        }
        public Ofertas(string nombre, string domicilio, int codigo_postal, string email, string telefono, string municipio, string estado,
                string perfil, string sueldo, string solicito, string requisitos, string actividades)
        {
            this.nombre = nombre;
            this.domicilio = domicilio;
            this.codigo_postal = codigo_postal;
            this.email = email;
            this.telefono = telefono;
            this.municipio = municipio;
            this.estado = estado;
            this.perfil = perfil;
            this.sueldo = sueldo;
            this.solicito = solicito;
            this.requisitos = requisitos;
            this.actividades = actividades;
        }
        public override string ToString()
        {
            return perfil + ", " + sueldo + "," + solicito + "," + requisitos + ", " + actividades + "," + email;
        }
    }
}