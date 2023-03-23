import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { BasicHeader } from "../../../component/standalone/Header";

const MyProfile: NextPage  = () => {
    return (
      <Box >
        <BasicHeader></BasicHeader>
        プロフィールを編集する
      </Box>
    )
  }
  
  export default MyProfile