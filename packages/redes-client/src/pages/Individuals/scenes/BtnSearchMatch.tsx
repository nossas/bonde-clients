import React from "react"
import { Link } from "react-router-dom"
import { Button } from "bonde-components"

const BtnSearchMatch = ({ original }: { original: { email: string; userStatus: string; availability: string } }): React.ReactElement =>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      width: "100%"
    }}
  >
    <Link
      style={{ textDecoration: "none" }}
      to={{
        pathname: "/match",
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