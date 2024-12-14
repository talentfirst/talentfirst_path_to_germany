import { getIpAddress } from './getIpAddress';
import { v4 as uuidv4 } from 'uuid';

export const coursePayload = async (answers) => {
  const ipAddress = await getIpAddress();
  const uuid = uuidv4();
  const browserInfo = navigator.userAgent;
  const deviceType = /Mobile/.test(navigator.userAgent) ? 'mobile' : 'desktop';
  console.log('when course payload is called', answers);
  return {
    uuid: uuid,
    personalInfo: {
      name: answers.personalInfo.name,
      email: answers.personalInfo.email,
      phone: answers.personalInfo.phone,
    },
    industry: answers.industry,
    otherIndustry: answers.otherIndustry,
    education: {
      qualification: answers.education.qualification,
      workExperience: answers.education.workExperience,
      jobRole: answers.education.jobRole,
    },
    germanSkills: answers.germanSkills,
    program: answers.program,
    questions: answers.questions,
    status: answers.status,
    isPartial: answers.isPartial,
    metaData: {
      browserInfo,
      deviceType,
      ipAddress,
    },
  };
};
