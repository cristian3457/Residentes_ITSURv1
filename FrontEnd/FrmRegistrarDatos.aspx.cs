using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BackEnd.Datos;
namespace FrontEnd
{
    public partial class FrmRegistrarDatos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            txtEmailUsuario.Value = "" + Session["email_usuario"];
            if (!IsPostBack)
            {
                ddlEstado.DataSource = new EstadosDao().getAll();
                ddlEstado.DataValueField = "id_estado";
                ddlEstado.DataTextField = "estado";
                ddlEstado.DataBind();
                ddlMunicipio.DataSource = new MunicipiosDao().getAll("Aguascalientes");
                ddlMunicipio.DataValueField = "id_municipio";
                ddlMunicipio.DataTextField = "municipio";
                ddlMunicipio.DataBind();
            }
        }
    }
}