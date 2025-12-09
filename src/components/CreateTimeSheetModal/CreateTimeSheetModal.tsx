"use client"

import { useState } from "react"
import { Modal, Select, Tooltip, Row, Col, Input } from "antd"
import { MinusOutlined, PlusOutlined, InfoCircleOutlined, CloseOutlined } from "@ant-design/icons"

const { TextArea } = Input

interface CreateTimeSheetProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: TimeSheetData) => void
}

interface TimeSheetData {
  project: string
  workType: string
  taskDescription: string
  hours: number
}

export const CreateTimeSheetModal: React.FC<CreateTimeSheetProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<TimeSheetData>({
    project: "",
    workType: "",
    taskDescription: "",
    hours: 12,
  })

  const handleProjectChange = (value: string) =>
    setFormData({ ...formData, project: value })

  const handleWorkTypeChange = (value: string) =>
    setFormData({ ...formData, workType: value })

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFormData({ ...formData, taskDescription: e.target.value })

  const handleHoursChange = (value: number | null) =>
    setFormData({ ...formData, hours: value || 0 })

  const handleAddEntry = () => {
    onSubmit?.(formData)
    handleCancel()
  }

  const handleCancel = () => {
    setFormData({
      project: "",
      workType: "",
      taskDescription: "",
      hours: 12,
    })
    onClose()
  }

  const projectOptions = [
    { label: "Project Name", value: "" },
    { label: "Project A", value: "projectA" },
    { label: "Project B", value: "projectB" },
    { label: "Project C", value: "projectC" },
  ]

  const workTypeOptions = [
    { label: "Bug fixes", value: "bugFixes" },
    { label: "Feature Development", value: "featureDev" },
    { label: "Testing", value: "testing" },
    { label: "Documentation", value: "documentation" },
  ]

  return (
    <Modal
      title={<span className="text-xl font-semibold">Add New Entry</span>}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      closeIcon={<CloseOutlined className="text-gray-500 hover:text-gray-700" />}
      width={750}
      centered
     bodyStyle={{
    maxHeight: "auto",     
    overflow: "hidden",    
  }}
    >
      <div className="space-y-6">

        <Row gutter={20}>
          <Col span={24}>
            <label className="block text-base font-medium text-gray-900 mb-2">
              Select Project <span className="text-red-500">*</span>
              <Tooltip title="Select the project for this timesheet entry">
                <InfoCircleOutlined className="ml-2 text-gray-400 cursor-pointer" />
              </Tooltip>
            </label>

            <Select
              placeholder="Project Name"
              value={formData.project || undefined}
              onChange={handleProjectChange}
              options={projectOptions}
              size="large"
              className="w-full"
            />
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={24}>
            <label className="block text-base font-medium text-gray-900 mb-2">
              Type of Work <span className="text-red-500">*</span>
              <Tooltip title="Select the type of work performed">
                <InfoCircleOutlined className="ml-2 text-gray-400 cursor-pointer" />
              </Tooltip>
            </label>

            <Select
              placeholder="Bug fixes"
              value={formData.workType || undefined}
              onChange={handleWorkTypeChange}
              options={workTypeOptions}
              size="large"
              className="w-full"
            />
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={24}>
            <label className="block text-base font-medium text-gray-900 mb-2">
              Task Description <span className="text-red-500">*</span>
            </label>

            <TextArea
              value={formData.taskDescription}
              onChange={handleDescriptionChange}
              rows={6}
              placeholder="Write here..."
              className="text-gray-700"
            />

            <p className="text-sm text-gray-500 mt-2">
              Add extra details if needed
            </p>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <label className="block text-base font-medium text-gray-900 mb-2">
              Hours <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center gap-2 w-fit">
              <button
                onClick={() => handleHoursChange(Math.max(0, formData.hours - 1))}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg hover:bg-gray-100 text-gray-600"
              >
                <MinusOutlined />
              </button>

              <Input
                type="number"
                value={formData.hours}
                onChange={(e) => handleHoursChange(Number(e.target.value))}
                className="w-20 text-center"
              />

              <button
                onClick={() => handleHoursChange(formData.hours + 1)}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg hover:bg-gray-100 text-gray-600"
              >
                <PlusOutlined />
              </button>
            </div>
          </Col>
        </Row>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={handleAddEntry}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition cursor-pointer"
        >
          Add Entry
        </button>

        <button
          onClick={handleCancel}
          className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 font-medium py-3 rounded-lg bg-white transition cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default CreateTimeSheetModal
