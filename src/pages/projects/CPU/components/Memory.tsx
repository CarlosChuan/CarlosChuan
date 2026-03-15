import { useEffect, useMemo, useState } from "react"
import { Grid } from "../../../../components/shared/Grid"
import { Text } from "../../../../components/shared/Text"
import palette from "../../../../constants/Colors"
import { getBaseLog } from "../../../../helpers/math"
import { Signed8Int } from "../domains/Signed8Int"
import { useRetrieveMemoryData } from "../hooks/useRetrieveMemoryData"

export const Memory = () => {
  const [memory, setMemory] = useState<Signed8Int[]>([])
  const [viewStyle, setViewStyle] = useState<"raw" | "readable">("raw");

  const { data: memoryStoredData, isLoading } = useRetrieveMemoryData();

  useEffect(() => {
    setMemory(memoryStoredData);
  }, [memoryStoredData])

  const rawMemoryComponent = useMemo(() => (
    <Grid style={{ display: "flex", flexDirection: "column", padding: "6px" }}>
      {
        memory.map((cell, idx, memory) => {
          const isLast = idx === memory.length - 1;
          return (
            <Grid key={`memory-raw-${idx}`} style={{
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
              {`${idx.toString(10).padStart(Math.ceil(getBaseLog(10, memory.length)), '0')}: ${cell.rawInt}`}
            </Grid>
          )
        }
        )
      }
    </Grid>)
    , [memory])

  const readableMemoryComponent = useMemo(() => (
    <Grid style={{ display: "flex", flexDirection: "column", padding: "6px" }}>
      {
        memory.map((cell, idx, memory) => {
          const isLast = idx === memory.length - 1;

          return (
            <Grid key={`memory-raw-${idx}`} style={{
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
              {`${idx.toString(10).padStart(Math.ceil(getBaseLog(10, memory.length)), '0')}: ${cell.readableInt}`}
            </Grid>
          )
        }
        )
      }
    </Grid>)
    , [memory])


  return (
    <Grid style={{ display: "flex", flexDirection: "column", backgroundColor: palette.light.white, width: "fit-content", minWidth: "200px", maxHeight: "70vh" }}>
      <Text style={{ color: palette.light.black, textAlign: "center" }}>
        Memory
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
        {viewStyle === "raw" ? rawMemoryComponent : readableMemoryComponent}
      </Grid>
    </Grid >
  )
}