import React, { useRef, useState } from "react";
import { Box, Text, Flex, Container, Button,Input} from "@chakra-ui/react";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
  } from '@chakra-ui/react'

const Section = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    
  const [counter, setCounter] = useState("0");
  const [result, setResult] = useState(0);
  const [operator, setOperator] = useState("");

  const handleButtonClick = (value) => {
    if (counter.length < 12) {
      let newCounter = counter.replace(/\t/g, "");
      newCounter = newCounter === "0" ? value.toString() : newCounter + value.toString();
      for (let i = newCounter.length - 3; i > 0; i -= 3) {
        newCounter = newCounter.slice(0, i) + "\t" + newCounter.slice(i);
      }
      setCounter(newCounter);
    }
  };

  const handleOperatorClick = (op) => {
    if (operator === "") {
      setResult(parseFloat(counter.replace(/\t/g, "")));
      setOperator(op);
      setCounter("0");
    } else {
      handleEqualClick();
      setOperator(op);
    }
  };

  const handleEqualClick = () => {
    const currentValue = parseFloat(counter.replace(/\t/g, ""));
    let res = 0;
    switch (operator) {
      case "+":
        res = result + currentValue;
        break;
      case "-":
        res = result - currentValue;
        break;
      case "*":
        res = result * currentValue;
        break;
      case "/":
        res = result / currentValue;
        break;
      default:
        res = currentValue;
    }
    setResult(res);
    setCounter(res.toString());
    setOperator("");
  };

  const Del = () => {
    if (counter.length > 1) {
      setCounter(counter.slice(0, -1));
    } else {
      setCounter("0");
    }
  };

  const Delt = () => {
    setCounter("0");
    setResult(0);
    setOperator("");
  };
  return (
    <>
      <Box w={"full"} h={"100vh"}>
        
      <Button ref={btnRef} marginTop={"2%"}   marginLeft={{md:"89%",base:"30%" }} onClick={onOpen}>
      Oцените нас
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>напиши своё мнение </DrawerHeader>
  
            <DrawerBody>
              <Input placeholder='пиши...' />
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
              Отмена
              </Button>
              <Button colorScheme='blue'>сохранить</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>


        <Container maxW={"container.xl"}>
          <Box
            maxW={{ md: "30%", base: "90%" }}
            bgColor={"white"}
            h={"50vh"}
            marginTop={"5%"}
            border={"1px solid gray"}
            padding={"10px"}
            borderRadius={"10px"}
          >
            <Container>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Text>{counter}</Text>
                <Flex gap={"10px"}>
                  <Button onClick={Del}>
                    <MdOutlineSubdirectoryArrowLeft />
                  </Button>
                  <Button onClick={Delt} marginRight={"11px"}>
                    <FaDeleteLeft />
                  </Button>
                </Flex>
              </Flex>
              <Box
                w={"100%"}
                h={"1px"}
                bgColor={"gray"}
                marginTop={"15px"}
              ></Box>
              <Box>
                <Flex gap={"10px"} marginTop={"5%"}>
                  <Button w={"30%"} onClick={() => handleButtonClick(1)}>1</Button>
                  <Button w={"30%"} onClick={() => handleButtonClick(2)}>2</Button>
                  <Button w={"30%"} onClick={() => handleButtonClick(3)}>3</Button>
                </Flex>
                <Flex gap={"10px"} marginTop={"5%"}>
                  <Button w={"30%"} onClick={() => handleButtonClick(4)}>4</Button>
                  <Button w={"30%"} onClick={() => handleButtonClick(5)}>5</Button>
                  <Button w={"30%"} onClick={() => handleButtonClick(6)}>6</Button>
                </Flex>
                <Flex gap={"10px"} marginTop={"5%"}>
                  <Button w={"30%"} onClick={() => handleButtonClick(7)}>7</Button>
                  <Button w={"30%"} onClick={() => handleButtonClick(8)}>8</Button>
                  <Button w={"30%"} onClick={() => handleButtonClick(9)}>9</Button>
                </Flex>
                <Flex gap={"10px"} marginTop={"5%"}>
                  <Button w={"30%"} onClick={() => handleButtonClick(0)}>0</Button>
                  <Button w={"30%"} onClick={() => handleOperatorClick("+")}>+</Button>
                  <Button w={"30%"} onClick={() => handleOperatorClick("-")}>-</Button>
                </Flex>
                <Flex gap={"10px"} marginTop={"5%"}>
                  <Button w={"30%"} onClick={() => handleOperatorClick("*")}>*</Button>
                  <Button w={"30%"} onClick={() => handleOperatorClick("/")}>/</Button>
                  <Button w={"30%"} onClick={handleEqualClick}>=</Button>
                </Flex>
              </Box>
            </Container>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Section;
