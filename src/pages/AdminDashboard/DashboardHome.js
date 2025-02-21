import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Upload, Button, Select, message, Card, Switch, InputNumber } from 'antd';
import { UploadOutlined, LoadingOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { storage, fireStore } from '../../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import "../../assets/css/dashboardhome.css";

const { Option } = Select;

const ResponsiveForm = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [addingClass, setAddingClass] = useState(false);
  const [newClass, setNewClass] = useState('');
  const [savingDraft, setSavingDraft] = useState(false);
  const [isMCQ, setIsMCQ] = useState(false); // Toggle between MCQ and regular topic form
  const [numMCQs, setNumMCQs] = useState(1); // Number of MCQs
  const [mcqs, setMcqs] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]); // MCQ data structure

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchClasses = async () => {
      const querySnapshot = await getDocs(collection(fireStore, 'classes'));
      const fetchedClasses = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      setClasses(fetchedClasses);

      const draft = JSON.parse(localStorage.getItem('draft'));
      if (draft) {
        setDescription(draft.description || '');
        form.setFieldsValue(draft);
      }
    };

    fetchClasses();
  }, [form]);

  // Handle form submission
  const onFinish = async (values) => {
    const { topic, class: selectedClasses, category, subCategory, file } = values;

    setUploading(true);
    let fileURLs = [];

    if (file && file.length > 0) {
      try {
        const uploadPromises = file.map((fileItem) => {
          const uniqueFileName = `${Date.now()}-${fileItem.name}`;
          const storageRef = ref(storage, `uploads/${uniqueFileName}`);
          const uploadTask = uploadBytesResumable(storageRef, fileItem.originFileObj);

          return new Promise((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
              },
              (error) => {
                console.error('Upload failed:', error);
                message.error('File upload failed.', 3);
                reject(error);
              },
              async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                fileURLs.push(downloadURL);
                resolve();
              }
            );
          });
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        setUploading(false);
        return;
      }
    }

    try {
      const topicData = {
        topic: topic || '',
        class: selectedClasses.join(', '),
        category: category || '',
        subCategory: isMCQ ? 'MCQ Test' : subCategory, // Set subCategory as "MCQ Test" if isMCQ is true
        description: isMCQ ? '' : description, // Hide description for MCQ
        fileURLs,
        mcqs: isMCQ ? mcqs : [], // Add MCQs if form is MCQ
        timestamp: new Date(),
      };

      await addDoc(collection(fireStore, 'topics'), topicData);
      message.success('Topic created successfully!', 3);

      localStorage.removeItem('draft');
    } catch (e) {
      console.error('Error adding document:', e);
      message.error('Failed to save topic.', 3);
    } finally {
      setUploading(false);
    }
  };

  // Handle class addition
  const handleAddClass = async () => {
    if (newClass && !classes.some(cls => cls.name === newClass)) {
      setAddingClass(true);
      try {
        const docRef = await addDoc(collection(fireStore, 'classes'), { name: newClass });
        setClasses([...classes, { id: docRef.id, name: newClass }]);
        setNewClass('');
        message.success(`Class ${newClass} added successfully!`, 3);
      } catch (e) {
        console.error('Error adding class:', e);
        message.error('Failed to add class.', 3);
      } finally {
        setAddingClass(false);
      }
    }
  };

  // Handle saving draft
  const handleSaveDraft = async (values) => {
    setSavingDraft(true);
    try {
      const draftData = { ...values, description };
      localStorage.setItem('draft', JSON.stringify(draftData));
      message.success('Draft saved successfully!', 3);
    } catch (error) {
      message.error('Error saving draft', 3);
    } finally {
      setSavingDraft(false);
    }
  };

  // Handle clearing draft
  const handleClearDraft = () => {
    localStorage.removeItem('draft');
    form.resetFields();
    setDescription('');
    message.success('Draft cleared!', 3);
  };

  // Handle MCQ question addition
  const handleAddMCQ = () => {
    setMcqs([...mcqs, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  // Handle MCQ input change
  const handleMCQChange = (index, key, value) => {
    const updatedMcqs = [...mcqs];
    updatedMcqs[index][key] = value;
    setMcqs(updatedMcqs);
  };

  // Handle toggle for MCQ form
  const handleToggleMCQ = (checked) => {
    setIsMCQ(checked);
    if (!checked) {
      setDescription('');
      setMcqs([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]); // Reset MCQs when switching back
    }
  };

  // MCQ Template
  const renderMCQTemplate = () => {
    return mcqs.map((mcq, index) => (
      <div key={index} style={{ marginBottom: '16px' }}>
        <h4>Question {index + 1}</h4>
        <Form.Item label="Question" required>
          <Input
            value={mcq.question}
            onChange={(e) => handleMCQChange(index, 'question', e.target.value)}
            placeholder="Enter question"
          />
        </Form.Item>
        <Form.Item label="Options" required>
          {mcq.options.map((option, optionIndex) => (
            <Input
              key={optionIndex}
              value={option}
              onChange={(e) => {
                const updatedOptions = [...mcq.options];
                updatedOptions[optionIndex] = e.target.value;
                handleMCQChange(index, 'options', updatedOptions);
              }}
              placeholder={`Option ${optionIndex + 1}`}
            />
          ))}
        </Form.Item>
        <Form.Item label="Correct Answer" required>
          <Input
            value={mcq.correctAnswer}
            onChange={(e) => handleMCQChange(index, 'correctAnswer', e.target.value)}
            placeholder="Enter correct answer"
          />
        </Form.Item>
      </div>
    ));
  };

  const joditConfig = {
    readonly: false,
    height: 400,
    width: 800,
  };

  return (
    <div className="form-container mt-2">
      <h1 className="text-center mb-2">Create Topic</h1>
      <Card bordered={false} style={{ margin: '20px auto', width: '100%', borderRadius: '10px' }}>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off" form={form}>
          <Form.Item label="Topic Name" name="topic">
            <Input placeholder="Enter topic name" />
          </Form.Item>

          <Form.Item label="Class" name="class" rules={[{ required: true, message: 'Please select a class!' }]}>
            <Select
              mode="multiple"
              placeholder="Select class(es)"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                    <Input
                      style={{ flex: 'auto' }}
                      placeholder="Add new class"
                      value={newClass}
                      onChange={(e) => setNewClass(e.target.value)}
                      onPressEnter={handleAddClass}
                    />
                    <Button
                      type="primary"
                      icon={addingClass ? <LoadingOutlined /> : <PlusOutlined />}
                      onClick={handleAddClass}
                    >
                      {addingClass ? 'Adding...' : 'Add'}
                    </Button>
                  </div>
                </>
              )}
            >
              {classes.map((classOption) => (
                <Option key={classOption.id} value={classOption.name}>
                  {classOption.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="SubCategory" name="subCategory">
            <Input placeholder="Enter subcategory" />
          </Form.Item>

          <Form.Item label="MCQ Test" name="mcqSwitch">
            <Switch checked={isMCQ} onChange={handleToggleMCQ} />
          </Form.Item>

          {isMCQ && (
            <>
              <Form.Item label="Number of MCQs" name="numMCQs">
                <InputNumber
                  min={1}
                  value={numMCQs}
                  onChange={(value) => {
                    setNumMCQs(value);
                    const updatedMcqs = [...mcqs];
                    while (updatedMcqs.length < value) {
                      updatedMcqs.push({ question: '', options: ['', '', '', ''], correctAnswer: '' });
                    }
                    setMcqs(updatedMcqs);
                  }}
                />
              </Form.Item>

              {renderMCQTemplate()}
              <Form.Item>
                <Button type="dashed" onClick={handleAddMCQ} block icon={<PlusOutlined />}>
                  Add More MCQs
                </Button>
              </Form.Item>
            </>
          )}

          {!isMCQ && (
            <Form.Item label="Description" name="description">
              <JoditEditor
                ref={editor}
                value={description}
                config={joditConfig}
                onBlur={(newContent) => setDescription(newContent)}
              />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={uploading}>
              {uploading ? <LoadingOutlined /> : 'Submit'}
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="default" block onClick={() => navigate('/ManageProducts')}>
              Manage Topics
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              block
              icon={<SaveOutlined />}
              onClick={() => handleSaveDraft(form.getFieldsValue())}
              loading={savingDraft}
            >
              {savingDraft ? 'Saving Draft...' : 'Save as Draft'}
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="danger" block onClick={handleClearDraft}>
              Clear Draft
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResponsiveForm;
