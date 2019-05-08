/*Based on users’ inputs of their background information such as gender, race, 
residence state, to discover which industry, degree and major should people go to achieve 
the average highest annual salary*/

select industry, Degreelevel, Major, avg(income) as AverageIncome
from People p join Occupation o on p.JobID = o.JobID join Education e on o.JobID = e.JobID join State s on p.StateID = s.StateID
where gender = 'Male' and race = "Black or African American" and StateName = "Pennsylvania"
group by industry, Degreelevel, Major
order by avg(income) desc;



/*healthcarerank and income(Pearson sample correlation coefficient)*/
SELECT (count(*) * sum(EducationRank * Income) - sum(EducationRank) * sum(Income)) / 
        (sqrt(count(*) * sum(EducationRank * EducationRank) - sum(EducationRank) * sum(EducationRank)) * sqrt(count(*) * sum(Income * Income) - sum(Income) * sum(Income)))
AS correlation_coefficient_sample
FROM People P JOIN State S ON P.StateID = S.StateID;

/*Check whether each state provides people the working 
opportunity in all kinds of industries and find out the all the 
states that offer the positions in all kinds of industries 
and their rank of quality of life is at top 40
sorted by the average annual income in descending order and QualityofLife Rank in ascending order.*/
SELECT StateName, QualityofLifeRank, avg(income) AS Average_Income
FROM People P JOIN State S ON P.StateID = S.StateID JOIN Occupation O ON O.JobID = P.JobID 
WHERE QualityofLifeRank<=40
GROUP BY StateName,QualityofLifeRank
HAVING count(distinct(industry)) = (SELECT count(distinct(industry)) FROM Occupation)  
ORDER BY avg(income) DESC, QualityofLifeRank ASC;

SELECT Gender, Race, Title,COUNT(DISTINCT(PersonID)) AS AMOUNT, AVG(Income) AS Average_Income
FROM People P JOIN Occupation O On P.JobID = O.JobID AND Industry = "Transportation and material moving occupations"
AND P.PersonID IN
(SELECT P.PersonID FROM People P JOIN State S ON P.StateID = S.StateID WHERE OpportunityRank >= 25)
GROUP BY Gender, Race, Title
HAVING Average_Income >100000
ORDER BY AMOUNT DESC;


SELECT Major, COUNT(DISTINCT(JobID))
FROM Education
GROUP BY Major

