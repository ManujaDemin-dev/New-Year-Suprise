"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link"
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast'
import config from "../config";

// SVG is showing an error
export const CopyIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path d="M7.5 3H14.6C16.8402 3 17.9603 3 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C21 6.03969 21 7.15979 21 9.4V16.5M6.2 21H14.3C15.4201 21 15.9802 21 16.408 20.782C16.7843 20.5903 17.0903 20.2843 17.282 19.908C17.5 19.4802 17.5 18.9201 17.5 17.8V9.7C17.5 8.57989 17.5 8.01984 17.282 7.59202C17.0903 7.21569 16.7843 6.90973 16.408 6.71799C15.9802 6.5 15.4201 6.5 14.3 6.5H6.2C5.0799 6.5 4.51984 6.5 4.09202 6.71799C3.71569 6.90973 3.40973 7.21569 3.21799 7.59202C3 8.01984 3 8.57989 3 9.7V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21Z" stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"/>
    </svg>
  );
};


const CreateWishModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ name, setName ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ generatedLink, setGeneratedLink ] = useState("")

  const axios_headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  }

  const copyLinkToClipboard = async () => {
    await navigator.clipboard.writeText(generatedLink).then(() => {
      toast.success("Coppied to clipboard");
    }).catch((error) => {
      toast.error("Error copying to clipboard")
    })
  }
  
  const handleOnClose = () => {
    setName("")
    setGeneratedLink("")
  }

  const handleCreateWish = async () => {
    setLoading(true)
    setGeneratedLink("")

    try {
      const response = await axios.post(`${config.BASE_API_URL_DOCKER}/wishes`, {
        "name": name
      }, axios_headers)

      if (response.status === 201) {
        setGeneratedLink(`${config.FRONTEND_URL}/wish/${response.data.id}`)
      } else {
        throw new Error("Failed to create the wish. Please try again.")
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Link onPress={onOpen} className="create-wish-link mt-16 text-xl cursor-pointer">
        Craft Your Own New Year Wish 🎉
      </Link>

      <Modal size="xl" backdrop="blur" radius="sm" isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} onClose={handleOnClose}>
        <ModalContent>
          {(onOpen) => (
            <>
              <ModalHeader className="flex flex-col text-2xl justify-center items-center">Craft Your Own New Year Wish 🎉</ModalHeader>

              <ModalBody className="-1">
                <Input
                  radius="sm"
                  size="lg"
                  placeholder="Enter Their Name"
                  variant="bordered"
                  onChange={(e) => setName(e.target.value)}
                />

                <Button color="primary" radius="sm" className="md:w-64 md:m-auto" onPress={handleCreateWish} isDisabled={loading ? true : false}>
                {loading ? "Creating Wish..." : "🎉 Create Wish 🎉"}
                </Button>

                <hr className="mt-3"></hr>
              </ModalBody>
              <ModalFooter className="bg-white mb-3">
                <div className="w-full">
                  <p className="mb-1">Share to your friend 🔗</p>

                  <Input
                  endContent={
                    <Link onPress={copyLinkToClipboard}>
                      <CopyIcon className="copy-link cursor-pointer text-xl" />
                    </Link>
                  }
                  radius="sm"
                  isReadOnly
                  size="lg"
                  value={generatedLink || "Your link will appear here"}
                  variant="bordered"
                />
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateWishModal;
