import { useState } from "react";
import { Grid } from "../../../../components/shared/Grid";
import { Text } from "../../../../components/shared/Text";
import palette from "../../../../constants/Colors";
import { bitToHex } from "../../../../helpers/strings";
import { useRetrievePC } from "../hooks/useRetrievePC";

export const ProgramCounter = () => {
  const [viewStyle, setViewStyle] = useState<"raw" | "readable">("raw");

  const { data: PC } = useRetrievePC();

  return (
    <Grid style={{ display: "flex", flexDirection: "column", backgroundColor: palette.light.white, width: "fit-content", minWidth: "200px", height: "fit-content", maxHeight: "70vh" }}>
      <Text style={{ color: palette.light.black, textAlign: "center" }}>
        Program Counter
      </Text>
      <Grid
        onClick={() => { setViewStyle((value) => value === "raw" ? "readable" : "raw") }}
        style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "1em", marginBottom: "4px", cursor: "pointer" }}
      >
        <Grid style={{ width: "8px", height: "8px", border: `1px solid ${palette.light.black}`, backgroundColor: viewStyle === "raw" ? "transparent" : palette.light.secondary10, marginRight: "4px" }} />
        <Text style={{ color: palette.light.black, userSelect: "none", cursor: "pointer" }}>{`Readable view style`}</Text>
      </Grid>
      <Text style={{ color: palette.light.black, textAlign: "center" }}>
        {viewStyle === "raw" ? PC : bitToHex(PC)}
      </Text>
    </Grid >
  )
}