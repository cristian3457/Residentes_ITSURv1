using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FrontEnd
{
    public partial class FrmSolicitarResidentes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            txtEmailUsuario.Value = "" + Session["email_usuario"];
            ddlCarrera.Items.Add("Sistemas Automotrices");
            ddlCarrera.Items.Add("Ambiental");
            ddlCarrera.Items.Add("Industrial");
            ddlCarrera.Items.Add("Gestion Empresarial");
            ddlCarrera.Items.Add("Sistemas Computacionales");
            ddlCarrera.Items.Add("Electrónica");
            ddlCarrera.Items.Add("Gastronomia");
        }
    }
}