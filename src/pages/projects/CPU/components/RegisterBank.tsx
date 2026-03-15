import { useMemo, useState } from "react";
import { Grid } from "../../../../components/shared/Grid";
import { Text } from "../../../../components/shared/Text";
import palette from "../../../../constants/Colors";
import { numToHex } from "../../../../helpers/strings";
import { useRetrieveRegisterBank } from "../hooks/useRetrieveRegisterBank";

export const RegisterBank = () => {
  const [viewStyle, setViewStyle] = useState<"raw" | "readable">("raw");

  const { data: registers, isLoading } = useRetrieveRegisterBank();


  const rawRegistersComponent = useMemo(() => (
    <Grid style={{ display: "flex", flexDirection: "column", padding: "6px" }}>
      {
        registers.map((register, idx, registers) => {
          const isLast = idx === registers.length - 1;
          return (
            <Grid key={`rb-raw-${idx}`} style={{
              color: palette.light.black,
              ...(isLast ? {} :
                {
                  marginBottom: '2px',
                  borderBottom: '1px solid #0000005d',
                }
              ),
              textTransform: "uppercase",
              fontFamily: "monospace"
            }}>
              {`${numToHex(idx, registers.length)}: ${register.rawInt}`}
            </Grid>
          )
        }
        )
      }
    </Grid>
  ), [registers])

  const readableInstructionsComponent = useMemo(() => (
    <Grid style={{ display: "flex", flexDirection: "column", padding: "6px" }}>
      {
        registers.map((register, idx, registers) => {
          const isLast = idx === registers.length - 1;

          return (
            <Grid key={`ir-readable-${idx}`} style={{
              color: palette.light.black,
              ...(isLast ? {} :
                {
                  marginBottom: '2px',
                  borderBottom: '1px solid #0000005d',
                }
              ),
              textTransform: "uppercase",
              fontFamily: "monospace"
            }}>
              {`${numToHex(idx, registers.length)}: ${register.readableInt}`}
            </Grid>
          )
        }
        )
      }
    </Grid>
  ), [registers])

  return (
    <Grid style={{ display: "flex", flexDirection: "column", backgroundColor: palette.light.white, width: "fit-content", minWidth: "200px", maxHeight: "70vh" }}>
      <Text style={{ color: palette.light.black, textAlign: "center" }}>
        Register Bank
      </Text>
      <Grid
        onClick={() => { setViewStyle((value) => value === "raw" ? "readable" : "raw") }}
        style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "1em", marginBottom: "4px", cursor: "pointer" }}
      >
        <Grid style={{ width: "8px", height: "8px", border: `1px solid ${palette.light.black}`, backgroundColor: viewStyle === "raw" ? "transparent" : palette.light.secondary10, marginRight: "4px" }} />
        <Text style={{ color: palette.light.black, userSelect: "none", cursor: "pointer" }}>{`Readable view style`}</Text>
      </Grid>
      <Grid style={{ overflowY: "scroll" }}>
        {isLoading && "LOADING..."}
        {viewStyle === "raw" ? rawRegistersComponent : readableInstructionsComponent}
      </Grid>
    </Grid >
  )
}