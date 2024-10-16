document.addEventListener('DOMContentLoaded', function () {
    let courseCount = 1;

    const addCourseButton = document.getElementById('addCourse');
    addCourseButton.addEventListener('click', () => {
        courseCount++;
        const courseInputs = document.getElementById('courseInputs');
        const newInputGroup = document.createElement('div');
        newInputGroup.classList.add('input-group', 'mt-3');
        newInputGroup.innerHTML = `
            <label class="block font-bold text-lg mb-1">Enter marks for Course ${courseCount}:</label>
            <input type="number" class="marks-input block w-full p-2 mb-2 border rounded-md">
            <label class="block font-bold text-lg mb-1">Weightage (%)</label>
            <input type="number" class="weightage-input block w-full p-2 border rounded-md">
        `;
        courseInputs.appendChild(newInputGroup);
    });

    const calculateButton = document.getElementById('calculate');
    calculateButton.addEventListener('click', calculateAggregate);

    function calculateAggregate() {
        const targetPercentage = document.getElementById('target').value;
        const marksInputs = document.querySelectorAll('.marks-input');
        const weightageInputs = document.querySelectorAll('.weightage-input');

        let totalMarks = 0;
        let obtainedMarks = 0;

        marksInputs.forEach((input, index) => {
            const marks = parseFloat(input.value) || 0;
            const weightage = parseFloat(weightageInputs[index].value) || 0;
            obtainedMarks += (marks * (weightage / 100));
            totalMarks += (100 * (weightage / 100));
        });

        const currentAggregate = (obtainedMarks / totalMarks) * 100;
        const targetMarks = (targetPercentage / 100) * totalMarks;
        const requiredMarks = targetMarks - obtainedMarks;

        if (requiredMarks > 0) {
            Swal.fire({
                title: 'Aggregate Calculation',
                text: `You need ${requiredMarks.toFixed(2)} more marks to achieve ${targetPercentage}% aggregate. Current Aggregate: ${currentAggregate.toFixed(2)}%`,
                icon: 'warning',
                confirmButtonText: 'Ok',
                background: '#f0f0f0',
                confirmButtonColor: '#3085d6'
            });
        } else {
            Swal.fire({
                title: 'Congratulations!',
                text: `You have already achieved ${currentAggregate.toFixed(2)}% or more. Congratulations!`,
                icon: 'success',
                confirmButtonText: 'Great!',
                background: '#f0f0f0',
                confirmButtonColor: '#3085d6'
            });
        }
    }

    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => {
        document.getElementById('courseInputs').innerHTML = `
            <div class="input-group mt-3">
                <label class="block font-bold text-lg mb-1">Enter marks for Course 1:</label>
                <input type="number" class="marks-input block w-full p-2 mb-2 border rounded-md">
                <label class="block font-bold text-lg mb-1">Weightage (%)</label>
                <input type="number" class="weightage-input block w-full p-2 border rounded-md">
            </div>
        `;
        document.getElementById('target').value = '';
    });
});

