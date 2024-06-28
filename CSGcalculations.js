document.getElementById("pension").addEventListener("input", updateResults);

updateResults();

function updateResults() {
    pension = parseFloat(document.getElementById("pension").value);

    if (isNaN(pension)) pension = 1200

    // const csg1 = getCSGRate1(pension) * 0.985 * pension;
    // const csg2 = getCSGRate2(pension) * 0.985 * pension;

    const pensionNet1 = pension; //calculatePensionAfterCSG(pension, getCSGRate1(pension));
    const pensionNet2 = getPensionPS(pension / (1 - getCSGRate1(pension)));
    // const pensionNet3 = getPensionProposition(pension / (1 - getCSGRate1(pension)));
    const pensionNetRE = ((1 - getCSGRate2(pension)) * pension) / (1 - getCSGRate1(pension));

    const difference2 = (pensionNet2 - pensionNet1);
    // const difference3 = (pensionNet3 - pensionNet1);
    const differenceRE = (pensionNetRE - pensionNet1);
    // const pensionBrutte = pension / (1 - getCSGRate1(pension));

    document.getElementById("pensionNet2").textContent = pensionNet2.toFixed(0);
    document.getElementById("difference2").textContent = difference2.toFixed(0);

    document.getElementById("pensionNetRE").textContent = pensionNetRE.toFixed(0);
    document.getElementById("differenceRE").textContent = differenceRE.toFixed(0);
}

function getCSGRate1(pension) {
    if (pension <= 1386) return 0;
    if (pension <= 1607) return 0.038;
    if (pension <= 2424) return 0.066;
    return 0.083;
}

function getCSGRate2(pension) {
    if (pension <= 409) return 0;
    if (pension <= 1110) return 0.038;
    if (pension <= 1607) return 0.055;
    if (pension <= 2485) return 0.075;
    if (pension <= 4985) return 0.092;
    if (pension <= 6651) return 0.112;
    return 0.132;
}

function getPensionPS(pension) {
    const tranches = [4907/12, 13324/12, 19287/12, 29817/12, 59817/12, 79817/12];
    const CSGParTranches = [0.038, 0.055, 0.075, 0.092, 0.112, 0.132];
    retainedCSG = 0;
    for (let i = 1; i < tranches.length; i++) {
        if (pension > tranches[i - 1]) retainedCSG += CSGParTranches[i - 1] * (Math.min(pension, tranches[i]) - tranches[i - 1]);
    }
    if (pension > tranches.at(-1)) retainedCSG += CSGParTranches.at(-1) * (pension - tranches.at(-1));
    return pension - retainedCSG;
}

function getPensionProposition(pension) {
    const tranches = [19287/12, 29817/12, 59817/12, 79817/12];
    const CSGParTranches = [0.075, 0.092, 0.112, 0.132];
    retainedCSG = 0;
    for (let i = 1; i < tranches.length; i++) {
        if (pension > tranches[i - 1]) retainedCSG += CSGParTranches[i - 1] * (Math.min(pension, tranches[i]) - tranches[i - 1]);
    }
    if (pension > tranches.at(-1)) retainedCSG += CSGParTranches.at(-1) * (pension - tranches.at(-1));
    return pension - retainedCSG;
}

function calculatePensionAfterCSG(pension, csgRate) {
    return pension * (1 - csgRate * 0.985);
}

function mySubmitFunction(e) {
    e.preventDefault();
    return false;
}