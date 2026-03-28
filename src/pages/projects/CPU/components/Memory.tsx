import { useEffect, useState } from "react"
import { Grid } from "../../../../components/shared/Grid"
import { Text } from "../../../../components/shared/Text"
import palette from "../../../../constants/Colors"
import { MemoryCell } from "../domains/MemoryCell"
import { useRetrieveMemoryData } from "../hooks/useRetrieveMemoryData"
import { useViewStyle } from "../hooks/useViewStyle"

export const Memory = () => {
  const [memory, setMemory] = useState<MemoryCell[]>([])

  const { data: viewStyle } = useViewStyle();
  const { data: memoryStoredData, isLoading } = useRetrieveMemoryData();

  useEffect(() => {
    setMemory(memoryStoredData);
  }, [memoryStoredData])


  return (
    <Grid style={{ display: "flex", flexDirection: "column", backgroundColor: palette.light.white, width: "fit-content", minWidth: "200px", maxHeight: "70vh" }}>
      <Text style={{ color: palette.light.black, textAlign: "center" }}>
        Memory
      </Text>
      <Grid style={{ overflowY: "scroll" }}>
        {isLoading && "LOADING..."}
        <Grid style={{ display: "flex", flexDirection: "column", padding: "6px" }}>
          {
            memory.map((cell, idx, memory) => {
              const isLast = idx === memory.length - 1;
              return (
                <Grid key={`memory-${viewStyle}-${idx}`} style={{
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
                  {cell.toString(viewStyle, memory.length)}
                </Grid>
              )
            }
            )
          }
        </Grid>
      </Grid>
    </Grid >
  )
}