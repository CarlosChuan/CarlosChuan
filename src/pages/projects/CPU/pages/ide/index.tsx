import { Grid } from "../../../../../components/shared/Grid"
import { IDEHeader } from "../../components/IdeHeader"
import { Editor } from "./Editor"
import { InstructionsGuide } from "./InstructionsGuide"

export const IDE = () => {
  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <IDEHeader />
      <Grid style={{
        display: "flex",
        flexDirection: "column",
        padding: 20,
        flexFlow: "wrap",
        gap: 10
      }}>
        <Editor />
        <InstructionsGuide />
      </Grid>
    </Grid>
  )
}