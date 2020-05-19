using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BackEnd.Modelo;
using BackEnd.Datos;
namespace FrontEnd
{
    public partial class FrmLogin : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            divMensaje.Visible = false;
        }

        protected void btnIniciarSesion_Click(object sender, EventArgs e)
        {
            //Verificar los datos que llegan del cliente
            UsuariosDao al = new UsuariosDao();
            try
            {
                Usuarios u = al.iniciarSesion(txtEmail.Text.Trim(), txtPassword.Text.Trim());
                if (u != null)
                {
                    Session["tipo_usuario"] = u.tipo_usuario;
                    Session["email_usuario"] = u.email;
                    Response.Redirect("FrmContenedor.aspx");
                }
                else
                {
                    divMensaje.Visible = true;
                    Session["tipo_usuario"] = "";
                }
            }
            catch (Exception ex)
            {
                divMensaje.Visible = true;
            }
        }
    }
}