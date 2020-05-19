using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BackEnd.Datos;
namespace FrontEnd
{
    public partial class FrmBuscarResidencias : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ddlMunicipioBusqueda.DataSource = new MunicipiosDao().getAllMunicipios();
                ddlMunicipioBusqueda.DataValueField = "id_municipio";
                ddlMunicipioBusqueda.DataTextField = "municipio";
                ddlMunicipioBusqueda.DataBind();
            }
        }
    }
}