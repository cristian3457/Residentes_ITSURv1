using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FrontEnd
{
    public partial class FrmCambiarPassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            txtTipoUsuario.Value = "" + Session["tipo_usuario"];
            txtEmailUsuario.Value = "" + Session["email_usuario"];
        }
    }
}