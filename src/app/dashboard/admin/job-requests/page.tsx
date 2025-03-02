"use client";
import React, { useState, useRef } from "react";
import { FiDownload, FiEye, FiX, FiFile, FiUpload, FiSend } from "react-icons/fi";

interface JobRequest {
  id: number;
  name: string;
  role: string;
  location: string;
  experience: number;
  startDate: string;
  resumeUrl: string;
  status: "pending" | "approved" | "rejected";
  email: string;
  phone: string;
  education: string;
  skills: string[];
  whyHireYou: string;
  expectedSalary: string;
  endDate: string;
  joiningLetterStatus?: 'pending' | 'uploaded';
  thankingLetterStatus?: 'pending' | 'uploaded';
  recommendationLetterStatus?: 'pending' | 'uploaded';
  hasAppliedForJoining?: boolean;
  hasAppliedForThanking?: boolean;
  hasAppliedForRecommendation?: boolean;
}

interface UserDetailsModalProps {
  request: JobRequest;
  onClose: () => void;
  onStatusChange: (id: number, status: "pending" | "approved" | "rejected") => void;
}

const UserDetailsModal = ({ request, onClose, onStatusChange }: UserDetailsModalProps) => {
  const [showJoiningUpload, setShowJoiningUpload] = useState(false);
  const [showThankingUpload, setShowThankingUpload] = useState(false);
  const [showRecommendationUpload, setShowRecommendationUpload] = useState(false);
  const [selectedJoiningFile, setSelectedJoiningFile] = useState<File | null>(null);
  const [selectedThankingFile, setSelectedThankingFile] = useState<File | null>(null);
  const [selectedRecommendationFile, setSelectedRecommendationFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [joiningLetterStatus, setJoiningLetterStatus] = useState(request.joiningLetterStatus || 'pending');
  const [thankingLetterStatus, setThankingLetterStatus] = useState(request.thankingLetterStatus || 'pending');
  const [recommendationLetterStatus, setRecommendationLetterStatus] = useState(request.recommendationLetterStatus || 'pending');
  const joiningFileInputRef = useRef<HTMLInputElement>(null);
  const thankingFileInputRef = useRef<HTMLInputElement>(null);
  const recommendationFileInputRef = useRef<HTMLInputElement>(null);
  const [activeWarning, setActiveWarning] = useState<number | null>(null);
  const [warningFiles, setWarningFiles] = useState<{ [key: number]: File | null }>({});
  const [warningMessages, setWarningMessages] = useState<{ [key: number]: string }>({});
  const [submittedWarnings, setSubmittedWarnings] = useState<number[]>([]);
  const warningFileRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handleJoiningAccept = () => {
    setShowJoiningUpload(true);
    setShowThankingUpload(false);
    setShowRecommendationUpload(false);
  };

  const handleThankingAccept = () => {
    setShowThankingUpload(true);
    setShowJoiningUpload(false);
    setShowRecommendationUpload(false);
  };

  const handleRecommendationAccept = () => {
    setShowRecommendationUpload(true);
    setShowJoiningUpload(false);
    setShowThankingUpload(false);
  };

  const handleJoiningFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedJoiningFile(file);
    }
  };

  const handleThankingFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedThankingFile(file);
    }
  };

  const handleRecommendationFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedRecommendationFile(file);
    }
  };

  const handleUploadAndSend = async (type: 'joining' | 'thanking' | 'recommendation') => {
    const selectedFile = type === 'joining' ? selectedJoiningFile : 
                        type === 'thanking' ? selectedThankingFile :
                        selectedRecommendationFile;
    if (!selectedFile) {
      alert(`Please select a ${type} letter first`);
      return;
    }

    setIsUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (type === 'joining') {
        setJoiningLetterStatus('uploaded');
      } else if (type === 'thanking') {
        setThankingLetterStatus('uploaded');
      } else {
        setRecommendationLetterStatus('uploaded');
      }

      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} letter sent successfully!`);
      setShowJoiningUpload(false);
      setShowThankingUpload(false);
      setShowRecommendationUpload(false);
    } catch (err: unknown) {
      console.error(`Error uploading ${type} letter:`, err);
      alert(`Error sending ${type} letter`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleWarningClick = (num: number) => {
    setActiveWarning(num);
  };

  const handleWarningFileSelect = (num: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setWarningFiles(prev => ({ ...prev, [num]: file }));
    }
  };

  const handleWarningMessageChange = (num: number, message: string) => {
    setWarningMessages(prev => ({ ...prev, [num]: message }));
  };

  const handleWarningSubmit = async (num: number) => {
    const file = warningFiles[num];
    const message = warningMessages[num];
    if (!file) {
      alert('Please select a file first');
      return;
    }
    if (!message?.trim()) {
      alert('Please enter a warning message');
      return;
    }

    setIsUploading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmittedWarnings(prev => [...prev, num]);
      alert(`Warning ${num} file and message uploaded successfully!`);
      setActiveWarning(null);
    } catch (err) {
      console.error(`Error uploading warning ${num} file:`, err);
      alert('Error uploading file and message');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Applicant Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {request.name}</p>
                
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Professional Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Role:</span> {request.role}</p>
                <p><span className="font-medium">Experience:</span> {request.experience} years</p>
                <p><span className="font-medium">Location:</span> {request.location}</p>
                <p><span className="font-medium">Expected Salary:</span> {request.expectedSalary}</p>
                <p><span className="font-medium">Start Date:</span> {new Date(request.startDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-semibold mb-2">Education</h3>
              <p>{request.education}</p>
            </div>

            

            <div className="md:col-span-2">
              <h3 className="font-semibold mb-2">Why Should We Hire You?</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{request.whyHireYou}</p>
            </div>
          </div>

          {/* Action Buttons Section */}
          {!showJoiningUpload && !showThankingUpload && !showRecommendationUpload ? (
            <div className="flex flex-col gap-2 sm:gap-3 mt-6">
              {/* Start Date and Joining Letter Section */}
              <div className="text-sm text-gray-600 mt-4 mb-1">
                Start Date: {new Date(request.startDate).toLocaleDateString()}
              </div>
              <div className="bg-gray-100 p-3 rounded-lg mb-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {request.hasAppliedForJoining ? "Applied for Joining Letter" : "Not Applied for Joining Letter"}
                </h3>
                <p className="text-sm text-gray-600 mb-2">Status: {joiningLetterStatus === 'uploaded' ? 'Uploaded' : 'Pending'}</p>
              </div>
              {joiningLetterStatus === 'uploaded' ? (
                <div className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center gap-2">
                  <FiFile className="text-gray-500" />
                  Joining letter already uploaded
                </div>
              ) : (
                <>
                  <button
                    onClick={handleJoiningAccept}
                    disabled={!request.hasAppliedForJoining || new Date() < new Date(request.startDate)}
                    className={`w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 ${
                      (!request.hasAppliedForJoining || new Date() < new Date(request.startDate)) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {request.hasAppliedForJoining ? "Approve Joining Letter" : "Not Applied for Joining Letter"}
                  </button>
                  <button
                    onClick={() => onStatusChange(request.id, "rejected")}
                    disabled={!request.hasAppliedForJoining || new Date() < new Date(request.startDate)}
                    className={`w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 ${
                      (!request.hasAppliedForJoining || new Date() < new Date(request.startDate)) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {request.hasAppliedForJoining ? "Reject Joining Letter" : "Not Applied for Joining Letter"}
                  </button>
                </>
              )}
              <div className="space-y-4 mt-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="space-y-2">
                    {submittedWarnings.includes(num) ? (
                      <div className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center gap-2">
                        <FiFile className="text-gray-500" />
                        Warning {num} already submitted
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleWarningClick(num)}
                          disabled={activeWarning === num}
                          className={`w-full px-4 py-2 rounded-lg transition-colors ${
                            activeWarning === num 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                          }`}
                        >
                          Warning {num}
                        </button>
                        
                        {activeWarning === num && (
                          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                            <p className="text-gray-700 font-medium mb-2">
                              {num === 1 && "First warning for inappropriate behavior"}
                              {num === 2 && "Second warning for policy violation"}
                              {num === 3 && "Final warning before termination"}
                            </p>
                            
                            <div className="space-y-2">
                              <label htmlFor={`warning-message-${num}`} className="block text-sm font-medium text-gray-700">
                                Warning Message
                              </label>
                              <textarea
                                id={`warning-message-${num}`}
                                rows={4}
                                placeholder="Enter your warning message here..."
                                value={warningMessages[num] || ''}
                                onChange={(e) => handleWarningMessageChange(num, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
                              />
                            </div>
                            
                            <div className="relative">
                              <input
                                type="file"
                                ref={(el: HTMLInputElement | null) => {
                                  if (el) warningFileRefs.current[num] = el;
                                }}
                                onChange={(e) => handleWarningFileSelect(num, e)}
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                              />
                              <button
                                onClick={() => warningFileRefs.current[num]?.click()}
                                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 transition-colors flex items-center justify-center gap-2"
                              >
                                <FiUpload className="text-gray-400" />
                                <span className="text-gray-600">
                                  {warningFiles[num] ? warningFiles[num]?.name : 'Select Warning Document'}
                                </span>
                              </button>
                            </div>
                            
                            <button
                              onClick={() => handleWarningSubmit(num)}
                              disabled={!warningFiles[num] || !warningMessages[num]?.trim() || isUploading}
                              className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 ${
                                (!warningFiles[num] || !warningMessages[num]?.trim() || isUploading) ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              <FiSend />
                              {isUploading ? 'Uploading...' : 'Submit Warning'}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
              {/* End Date and Thanking Letter Section */}
              <div className="text-sm text-gray-600 mt-4 mb-1">
                End Date: {new Date(request.endDate).toLocaleDateString()}
              </div>
              <div className="bg-gray-100 p-3 rounded-lg mb-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {request.hasAppliedForThanking ? "Applied for Thanking Letter" : "Not Applied for Thanking Letter"}
                </h3>
                <p className="text-sm text-gray-600 mb-2">Status: {thankingLetterStatus === 'uploaded' ? 'Uploaded' : 'Pending'}</p>
              </div>
              {thankingLetterStatus === 'uploaded' ? (
                <div className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center gap-2">
                  <FiFile className="text-gray-500" />
                  Thanking letter already uploaded
                </div>
              ) : (
                <>
                  <button
                    onClick={handleThankingAccept}
                    disabled={!request.hasAppliedForThanking || new Date() < new Date(request.endDate)}
                    className={`w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 ${
                      (!request.hasAppliedForThanking || new Date() < new Date(request.endDate)) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {request.hasAppliedForThanking ? "Approve Thanking Letter" : "Not Applied for Thanking Letter"}
                  </button>
                  <button
                    onClick={() => onStatusChange(request.id, "rejected")}
                    disabled={!request.hasAppliedForThanking || new Date() < new Date(request.endDate)}
                    className={`w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 ${
                      (!request.hasAppliedForThanking || new Date() < new Date(request.endDate)) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {request.hasAppliedForThanking ? "Reject Thanking Letter" : "Not Applied for Thanking Letter"}
                  </button>
                </>
              )}

              {/* Recommendation Letter Section */}
              <div className="text-sm text-gray-600 mt-4 mb-1">
                Recommendation Letter
              </div>
              <div className="bg-gray-100 p-3 rounded-lg mb-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {request.hasAppliedForRecommendation ? "Applied for Letter of Recommendation" : "Not Applied for Letter of Recommendation"}
                </h3>
                <p className="text-sm text-gray-600 mb-2">Status: {recommendationLetterStatus === 'uploaded' ? 'Uploaded' : 'Pending'}</p>
              </div>
              {recommendationLetterStatus === 'uploaded' ? (
                <div className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center gap-2">
                  <FiFile className="text-gray-500" />
                  Recommendation letter already uploaded
                </div>
              ) : (
                <>
                  <button
                    onClick={handleRecommendationAccept}
                    disabled={!request.hasAppliedForRecommendation || new Date() < new Date(request.endDate)}
                    className={`w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 ${
                      (!request.hasAppliedForRecommendation || new Date() < new Date(request.endDate)) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {request.hasAppliedForRecommendation ? "Approve Recommendation Letter" : "Not Applied for Recommendation Letter"}
                  </button>
                  <button
                    onClick={() => onStatusChange(request.id, "rejected")}
                    disabled={!request.hasAppliedForRecommendation || new Date() < new Date(request.endDate)}
                    className={`w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 ${
                      (!request.hasAppliedForRecommendation || new Date() < new Date(request.endDate)) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {request.hasAppliedForRecommendation ? "Reject Recommendation Letter" : "Not Applied for Recommendation Letter"}
                  </button>
                </>
              )}
            </div>
          ) : showJoiningUpload ? (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-gray-800">Upload Joining Letter</h4>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="file"
                    ref={joiningFileInputRef}
                    onChange={handleJoiningFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                  <button
                    onClick={() => joiningFileInputRef.current?.click()}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiUpload className="text-gray-400" />
                    <span className="text-gray-600">
                      {selectedJoiningFile ? selectedJoiningFile.name : 'Select Joining Letter'}
                    </span>
                  </button>
                </div>
                <button
                  onClick={() => handleUploadAndSend('joining')}
                  disabled={!selectedJoiningFile || isUploading}
                  className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 ${
                    (!selectedJoiningFile || isUploading) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FiSend />
                  {isUploading ? 'Sending...' : 'Send Joining Letter'}
                </button>
              </div>
            </div>
          ) : showThankingUpload ? (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-gray-800">Upload Thanking Letter</h4>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="file"
                    ref={thankingFileInputRef}
                    onChange={handleThankingFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                  <button
                    onClick={() => thankingFileInputRef.current?.click()}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiUpload className="text-gray-400" />
                    <span className="text-gray-600">
                      {selectedThankingFile ? selectedThankingFile.name : 'Select Thanking Letter'}
                    </span>
                  </button>
                </div>
                <button
                  onClick={() => handleUploadAndSend('thanking')}
                  disabled={!selectedThankingFile || isUploading}
                  className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 ${
                    (!selectedThankingFile || isUploading) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FiSend />
                  {isUploading ? 'Sending...' : 'Send Thanking Letter'}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-gray-800">Upload Recommendation Letter</h4>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="file"
                    ref={recommendationFileInputRef}
                    onChange={handleRecommendationFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                  <button
                    onClick={() => recommendationFileInputRef.current?.click()}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiUpload className="text-gray-400" />
                    <span className="text-gray-600">
                      {selectedRecommendationFile ? selectedRecommendationFile.name : 'Select Recommendation Letter'}
                    </span>
                  </button>
                </div>
                <button
                  onClick={() => handleUploadAndSend('recommendation')}
                  disabled={!selectedRecommendationFile || isUploading}
                  className={`w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 ${
                    (!selectedRecommendationFile || isUploading) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FiSend />
                  {isUploading ? 'Sending...' : 'Send Recommendation Letter'}
                </button>
              </div>
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
};

const JobRequestsPage = () => {
  const [selectedRequest, setSelectedRequest] = useState<JobRequest | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Sample data - replace with actual API data
  const [jobRequests, setJobRequests] = useState<JobRequest[]>([
    {
    "id": 2,
    "name": "Aisha Khan",
    "role": "Senior Software Engineer",
    "location": "Bangalore",
    "experience": 5,
    "startDate": "2024-05-10",
    "resumeUrl": "#",
    "status": "approved",
    "email": "aisha.khan@example.com",
    "phone": "+91 9823456789",
    "education": "B.Tech in Computer Science from IIT Delhi",
    "skills": ["Java", "Spring Boot", "Microservices", "Cloud Computing"],
    "whyHireYou": "With expertise in backend development and cloud-based architectures, I have successfully delivered scalable solutions for fintech and e-commerce industries. My technical leadership has helped teams improve efficiency by 30%.",
    "expectedSalary": "₹30-35 LPA",
    "endDate": "2024-05-25",
    "hasAppliedForJoining": true,
    "hasAppliedForThanking": false,
    "hasAppliedForRecommendation": false
  },
  {
    "id": 3,
    "name": "Rahul Sharma",
    "role": "Product Manager",
    "location": "Hyderabad",
    "experience": 7,
    "startDate": "2024-06-01",
    "resumeUrl": "#",
    "status": "pending",
    "email": "rahul.sharma@example.com",
    "phone": "+91 9890123456",
    "education": "MBA in Product Management from ISB Hyderabad",
    "skills": ["Product Strategy", "Agile Methodologies", "Market Research", "Roadmap Planning"],
    "whyHireYou": "As a product manager with 7 years of experience, I have led cross-functional teams to develop innovative SaaS products. My data-driven approach has increased customer engagement by 50% in my previous role.",
    "expectedSalary": "₹35-40 LPA",
    "endDate": "2024-06-15",
    "hasAppliedForJoining": false,
    "hasAppliedForThanking": false,
    "hasAppliedForRecommendation": false
  },
  {
    "id": 4,
    "name": "Neha Verma",
    "role": "UX Designer",
    "location": "Pune",
    "experience": 4,
    "startDate": "2024-07-10",
    "resumeUrl": "#",
    "status": "approved",
    "email": "neha.verma@example.com",
    "phone": "+91 9765432109",
    "education": "M.Des in Interaction Design from NID Ahmedabad",
    "skills": ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    "whyHireYou": "With a passion for user-centric design, I have worked on multiple digital products that enhanced user engagement by 60%. My expertise in usability testing ensures high-quality experiences for end-users.",
    "expectedSalary": "₹18-22 LPA",
    "endDate": "2024-07-25",
    "hasAppliedForJoining": true,
    "hasAppliedForThanking": true,
    "hasAppliedForRecommendation": false
  },
  {
    "id": 5,
    "name": "Vikram Mehta",
    "role": "Data Scientist",
    "location": "Chennai",
    "experience": 6,
    "startDate": "2024-08-05",
    "resumeUrl": "#",
    "status": "approved",
    "email": "vikram.mehta@example.com",
    "phone": "+91 9988776655",
    "education": "M.Tech in Artificial Intelligence from IIIT Hyderabad",
    "skills": ["Machine Learning", "Data Analysis", "Python", "Deep Learning"],
    "whyHireYou": "I have developed and deployed AI-driven models that optimized decision-making processes, resulting in a 25% cost reduction. My proficiency in NLP and predictive analytics can contribute significantly to your data-driven strategies.",
    "expectedSalary": "₹28-32 LPA",
    "endDate": "2024-08-20",
    "hasAppliedForJoining": true,
    "hasAppliedForThanking": true,
    "hasAppliedForRecommendation": true
  },
  {
    "id": 6,
    "name": "Priya Das",
    "role": "Marketing Manager",
    "location": "Delhi",
    "experience": 8,
    "startDate": "2024-09-01",
    "resumeUrl": "#",
    "status": "approved",
    "email": "priya.das@example.com",
    "phone": "+91 9876098765",
    "education": "MBA in Marketing from IIM Bangalore",
    "skills": ["Brand Management", "Digital Marketing", "SEO", "Growth Hacking"],
    "whyHireYou": "With 8 years of experience in digital marketing and brand strategy, I have successfully launched campaigns that increased brand awareness by 70%. My expertise in performance marketing ensures high ROI.",
    "expectedSalary": "₹22-27 LPA",
    "endDate": "2024-09-15",
    "hasAppliedForJoining": false,
    "hasAppliedForThanking": false,
    "hasAppliedForRecommendation": false
  },
  {
    "id": 7,
    "name": "Arjun Reddy",
    "role": "Managing Director",
    "location": "Mumbai",
    "experience": 12,
    "startDate": "2024-10-01",
    "resumeUrl": "#",
    "status": "pending",
    "email": "arjun.reddy@example.com",
    "phone": "+91 9876543210",
    "education": "MBA from IIM Ahmedabad",
    "skills": ["Strategic Planning", "Team Leadership", "Business Development"],
    "whyHireYou": "Proven track record of scaling businesses and leading teams to success.",
    "expectedSalary": "₹45-50 LPA",
    "endDate": "2024-10-15",
    "hasAppliedForJoining": false,
    "hasAppliedForThanking": false,
    "hasAppliedForRecommendation": false
  },
  {
    "id": 8,
    "name": "Sanjay Kumar",
    "role": "Event Manager",
    "location": "Pune",
    "experience": 6,
    "startDate": "2024-10-15",
    "resumeUrl": "#",
    "status": "approved",
    "email": "sanjay.kumar@example.com",
    "phone": "+91 9876543211",
    "education": "Diploma in Event Management",
    "skills": ["Event Planning", "Vendor Management", "Budget Planning"],
    "whyHireYou": "Successfully managed over 100 corporate events with excellent feedback.",
    "expectedSalary": "₹15-18 LPA",
    "endDate": "2024-10-30",
    "hasAppliedForJoining": true,
    "hasAppliedForThanking": false,
    "hasAppliedForRecommendation": false
  },
  {
    "id": 9,
    "name": "Meera Patel",
    "role": "Cook",
    "location": "Mumbai",
    "experience": 8,
    "startDate": "2024-11-01",
    "resumeUrl": "#",
    "status": "pending",
    "email": "meera.patel@example.com",
    "phone": "+91 9876543212",
    "education": "Culinary Arts Certificate",
    "skills": ["Indian Cuisine", "International Cuisine", "Menu Planning"],
    "whyHireYou": "Expert in multiple cuisines with experience in 5-star hotels.",
    "expectedSalary": "₹12-15 LPA",
    "endDate": "2024-11-15",
    "hasAppliedForJoining": false,
    "hasAppliedForThanking": false,
    "hasAppliedForRecommendation": false
  },
  {
    "id": 10,
    "role": "Security Guard",
    "name": "Rajesh Singh",
    "location": "Delhi",
    "experience": 5,
    "startDate": "2024-11-15",
    "resumeUrl": "#",
    "status": "approved",
    "email": "rajesh.singh@example.com",
    "phone": "+91 9876543213",
    "education": "Security Management Certificate",
    "skills": ["Security Protocols", "Emergency Response", "Surveillance"],
    "whyHireYou": "Ex-military personnel with extensive security management experience.",
    "expectedSalary": "₹5-7 LPA",
    "endDate": "2024-11-30",
    "hasAppliedForJoining": true,
    "hasAppliedForThanking": true,
    "hasAppliedForRecommendation": false
  },
  {
    "id": 11,
    "name": "Anita Desai",
    "role": "Social Media Handler",
    "location": "Bangalore",
    "experience": 4,
    "startDate": "2024-12-01",
    "resumeUrl": "#",
    "status": "pending",
    "email": "anita.desai@example.com",
    "phone": "+91 9876543214",
    "education": "Bachelor's in Mass Communication",
    "skills": ["Social Media Marketing", "Content Creation", "Analytics"],
    "whyHireYou": "Grew social media engagement by 200% in previous role.",
    "expectedSalary": "₹8-10 LPA",
    "endDate": "2024-12-15",
    "hasAppliedForJoining": false,
    "hasAppliedForThanking": false,
    "hasAppliedForRecommendation": false
  },
  {
    "id": 12,
    "name": "Suresh Menon",
    "role": "Electrician",
    "location": "Chennai",
    "experience": 7,
    "startDate": "2024-12-15",
    "resumeUrl": "#",
    "status": "approved",
    "email": "suresh.menon@example.com",
    "phone": "+91 9876543215",
    "education": "ITI in Electrical",
    "skills": ["Electrical Systems", "Maintenance", "Troubleshooting"],
    "whyHireYou": "Licensed electrician with industrial and commercial experience.",
    "expectedSalary": "₹6-8 LPA",
    "endDate": "2024-12-30",
    "hasAppliedForJoining": true,
    "hasAppliedForThanking": false,
    "hasAppliedForRecommendation": false
  }
  ]);

  const [filters, setFilters] = useState({
    requestType: "all",
    role: "",
    location: "",
    startDate: "",
    experience: "",
    salaryRange: "",
    applicationStatus: "all",
    letterType: "all",
  });

  const roles = ["Managing Director", "Event Manager", "Sales Manager", "Promoting Manager", "Photographer", "Cook", "Housekeeping", "Security Guards", "Driver", "Social media handler", "Electrician", "Plumber", "Technician", "Cleaning Staff", "Gardener", "Other"];
  
  const locations = ["Mumbai", "Pune", "Bangalore", "Delhi", "Remote"];
  const experienceLevels = ["0-1", "1-2", "2-3", "3-5", "5+"];
  const requestTypes = ["all", "pending", "approved", "rejected"];
  const applicationStatuses = ["all", "applied", "not applied"];
  const letterTypes = ["all", "joining", "thanking", "recommendation"];

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredRequests = jobRequests.filter((request) => {
    // Helper function to check if experience is within range
    const isExperienceInRange = (exp: number, range: string) => {
      if (!range) return true;
      const [min, max] = range.split('-').map(Number);
      if (range.includes('+')) {
        return exp >= Number(range.replace('+', ''));
      }
      return exp >= min && exp <= max;
    };

    // Helper function to check application status
    const matchesApplicationStatus = () => {
      if (filters.applicationStatus === "all") return true;
      if (filters.applicationStatus === "applied") {
        return request.hasAppliedForJoining || request.hasAppliedForThanking || request.hasAppliedForRecommendation;
      }
      return !request.hasAppliedForJoining && !request.hasAppliedForThanking && !request.hasAppliedForRecommendation;
    };

    // Helper function to check letter type
    const matchesLetterType = () => {
      if (filters.letterType === "all") return true;
      if (filters.letterType === "joining") return request.hasAppliedForJoining;
      if (filters.letterType === "thanking") return request.hasAppliedForThanking;
      if (filters.letterType === "recommendation") return request.hasAppliedForRecommendation;
      return true;
    };

    return (
      (filters.requestType === "all" || request.status === filters.requestType) &&
      (!filters.role || request.role === filters.role) &&
      (!filters.location || request.location === filters.location) &&
      (!filters.startDate || request.startDate >= filters.startDate) &&
      (!filters.experience || isExperienceInRange(request.experience, filters.experience)) &&
      (!filters.salaryRange || request.expectedSalary.includes(filters.salaryRange)) &&
      matchesApplicationStatus() &&
      matchesLetterType()
    );
  });

  const handleStatusChange = (id: number, newStatus: "pending" | "approved" | "rejected") => {
    setJobRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Pagination component
  const Pagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 mt-4 bg-white rounded-lg shadow">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">{startIndex + 1}</span>
              {' '}-{' '}
              <span className="font-medium">
                {Math.min(startIndex + itemsPerPage, filteredRequests.length)}
              </span>{' '}
              of{' '}
              <span className="font-medium">{filteredRequests.length}</span>{' '}
              results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                First
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === number
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Last
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Job Requests</h1>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-6">
        {/* First row - 3 filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="applicationStatus"
            value={filters.applicationStatus}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-lg bg-white"
          >
            {applicationStatuses.map((status) => (
              <option key={status} value={status}>
                {status === "all" 
                  ? "All Applications Status" 
                  : status === "applied" 
                    ? "Applied" 
                    : "Not Applied"}
              </option>
            ))}
          </select>

          <select
            name="letterType"
            value={filters.letterType}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-lg bg-white"
          >
            {letterTypes.map((type) => (
              <option key={type} value={type}>
                {type === "all" 
                  ? "All Letter Types" 
                  : type.charAt(0).toUpperCase() + type.slice(1) + " Letter"}
              </option>
            ))}
          </select>

          <select
            name="requestType"
            value={filters.requestType}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-lg bg-white"
          >
            {requestTypes.map((type) => (
              <option key={type} value={type}>
                {type === "all" ? "All Requests Status" : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Second row - remaining filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select
            name="experience"
            value={filters.experience}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="">Experience (Years)</option>
            {experienceLevels.map((exp) => (
              <option key={exp} value={exp}>
                {exp} years
              </option>
            ))}
          </select>
          

          <div className="relative">
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg bg-white"
              placeholder="Available From"
            />
          </div>

          

          <input
            type="text"
            name="salaryRange"
            value={filters.salaryRange}
            onChange={handleFilterChange}
            placeholder="Expected Salary (e.g. 10-15 LPA)"
            className="w-full p-2 border rounded-lg bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50 cursor-pointer">
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={() => setSelectedRequest(request)}
                >
                  {request.name}
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={() => setSelectedRequest(request)}
                >
                  {request.role}
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={() => setSelectedRequest(request)}
                >
                  {request.location}
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={() => setSelectedRequest(request)}
                >
                  {request.experience} years
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={() => setSelectedRequest(request)}
                >
                  {new Date(request.startDate).toLocaleDateString()}
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={() => setSelectedRequest(request)}
                >
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      request.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : request.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.open(request.resumeUrl, "_blank")}
                      className="text-blue-600 hover:text-blue-900"
                      title="View Resume"
                    >
                      <FiEye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => window.open(request.resumeUrl, "_blank")}
                      className="text-green-600 hover:text-green-900"
                      title="Download Resume"
                    >
                      <FiDownload className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination />

      {/* User Details Modal */}
      {selectedRequest && (
        <UserDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default JobRequestsPage;
