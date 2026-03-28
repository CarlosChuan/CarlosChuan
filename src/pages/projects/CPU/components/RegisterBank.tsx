import { Grid } from "../../../../components/shared/Grid";
import { Text } from "../../../../components/shared/Text";
import palette from "../../../../constants/Colors";
import { useRetrieveRegisterBank } from "../hooks/useRetrieveRegisterBank";
import { useViewStyle } from "../hooks/useViewStyle";

export const RegisterBank = () => {
  const { data: viewStyle } = useViewStyle();
  const { data: registers, isLoading } = useRetrieveRegisterBank();


  return (
    <Grid style={{ display: "flex", flexDirection: "column", backgroundColor: palette.light.white, width: "fit-content", minWidth: "200px", maxHeight: "70vh" }}>
      <Text style={{ color: palette.light.black, textAlign: "center" }}>
        Register Bank
      </Text>
      <Grid style={{ overflowY: "scroll" }}>
        {isLoading && "LOADING..."}
        <Grid style={{ display: "flex", flexDirection: "column", padding: "6px" }}>
          {
            registers.map((register, idx, registers) => {
              const isLast = idx === registers.length - 1;
              return (
                <Grid key={`rb-${viewStyle}-${idx}`} style={{
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
                  {register.toString(viewStyle, registers.length)}
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