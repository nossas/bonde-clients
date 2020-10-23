import React from "react"
import { Link } from "react-router-dom"
import { Button } from "bonde-components"

const BtnSearchMatch = ({ original }: { original: { email: string; userStatus: string; availability: string } }): React.ReactElement =>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "200px",
      justifyContent: "center",
    }}
  >
    <Link
      style={{ textDecoration: "none" }}
      to={{
        pathname: "/match",
        search: `?email=${original.email}`,
        state: { ...original },
      }}
    >
      <Button
        main="#ee0099"
        hover="#e2058a"
        focus="#b06c"
        secondary
        disabled={
          original.userStatus !== "aprovada" ||
          original.availability !== "disponível"
        }
      >
        Buscar match
        </Button>
    </Link>
  </div>

export default BtnSearchMatch